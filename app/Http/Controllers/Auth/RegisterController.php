<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use App\Http\Controllers\maps\ProvinsiController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cache;
use App\Models\sessionMod;
use App\Models\profileModel;
use App\Models\Kelurahan;
use App\Models\Kecamatan;
use App\Models\Kabupaten;
use App\Models\provinsiModel;
use Carbon\Carbon;

class RegisterController extends Controller
{
    protected $redirectTo = RouteServiceProvider::VERIFICATION;

    public function __construct()
    {
        $this->middleware('guest');
        $this->middleware('cors'); // Add the cors middleware to handle CORS requests
        // $this->middleware('web'); // Adds session middleware to the controller
    }

    /**
     * Send the verification code via Fontee API to the user's WhatsApp number.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    protected function verifyCreateUser(Request $request)
    {
        try {
            Log::info('Request data:', is_array($request->all()) ? $request->all() : []);   
            $validatedData = $request->validate([
                'nama' => ['required', 'string', 'max:255'],
                'ktp' => ['required', 'string','max:255'],
                'pekerjaan' => ['required', 'string', 'max:255'],
                'golongan_darah' => ['required', 'string'],
                'kelurahan_id' => ['exists:kelurahan,id'],
                'telepon' => ['required', 'string', 'max:255'],
            ]);         
    

            $this->createUser($validatedData);
            return response()->json(['message' => 'Successfully Validate'],200);
        } catch (ValidationException $e) {
            // Handle any exceptions that occurred during the createUser process
            return response()->json(['message' => 'Failed to create user. Please try again.', 'error' => $e->getMessage()], 500);
        }
    }

private function createUser(array $data)
{
    // Retrieve the validated data from the session
    $validatedData = session('validated_data');
    try {
        // Generate UUID for id_user column
        $id_user = Str::uuid();

        // Begin database transaction
        DB::beginTransaction();

        $user = User::create([
            'id' => $id_user,
            'nama' => $data['nama'],
            'telepon' => $data['telepon'],
        ]);

        // Create profile record with user_id and other validated data
        $profile = new profileModel([
            'id_user' => $id_user,
            'nama' => $data['nama'],
            'telepon' => $data['telepon'],
            'golongan_darah' => $data['golongan_darah'],
            'ktp' => $data['ktp'],
            'pekerjaan' => $data['pekerjaan'],
        ]);

        // Get kelurahan IDs from validated data
        $kelurahanId = $data['kelurahan_id'];

        // Associate kelurahan with the profile
        $profile->kelurahan()->associate(Kelurahan::find($kelurahanId));
        $profile->save();

        // Delete data from sessions table based on the telephone number
        $teleponToDelete = $data['telepon'];
        sessionMod::where('data', 'LIKE', '%"telepon":"' . $teleponToDelete . '"%')->delete();

        // Commit the database transaction
        DB::commit();

        return $user;
    } catch (\Exception $e) {
        // Rollback the database transaction in case of an exception
        DB::rollback();
        throw $e; // Re-throw the exception for further handling, if needed
    }
}
    public function verify(Request $request)
    {
        try {
            Log::info('Request data:', $request->all());
            // Validate the input data
            $validatedData = $request->validate([
                'telepon' => ['required', 'string', 'max:255'],
            ]);
            
            // Store the validated data in the session
            session()->put(['validated_data' => $validatedData]);
            session()->save();

            Log::info('tes session :', Session::get('validated_data'));

            // Send the verification code
            $this->sendVerify($request);
            return response()->json(['message' => 'A verification code has been sent to your WhatsApp number.'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions that occurred during the sendVerify process
            return response()->json(['message' => 'Failed to send verification code. Please try again.', 'error' => $e->getMessage()], 500);
        }
    }
    protected function validateCheck(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'code' => 'required|digits:6',
            ]);
    
            $userCode = $request->input('code');
    
            // Fetch all session models
            $sessionMod = sessionMod::all();
    
            // Log all session data
            Log::info("All Data: " . json_encode($sessionMod));
    
            $matchingSession = null;
    
            foreach ($sessionMod as $sessionModel) {
                $sessionCode = strval($sessionModel->code);
    
                if ($userCode === $sessionCode) {
                    // Found a matching session
                    $matchingSession = $sessionModel;
                    break;
                }
            }
    
            if ($matchingSession !== null) {
                // Matching session found
                $sessionDataArray = json_decode($matchingSession->data, true);
    
                // Check if decoding was successful
                if ($sessionDataArray === null && json_last_error() !== JSON_ERROR_NONE) {
                    Log::error("Failed to decode JSON data: " . json_last_error_msg());
                    throw new \Exception("Failed to decode JSON data.");
                }
    
                // Save session ID and validated data to the session
                // session()->put('session_id', $matchingSession->session_id);
                session()->put('session_id', $matchingSession->session_id);
                session()->put(['validated_data', $sessionDataArray]);
                session()->save();
    
                // Log data to the log file
                Log::info("Data Session Database: " . json_encode($sessionDataArray));
                return response()->json(['message' => 'Successfully OTP Verification.',]);
            } else {
                // No matching session found
                Log::info("Invalid verification code received: $userCode");
    
                throw ValidationException::withMessages([
                    'code' => ['Invalid verification code. Please try again.'],
                ]);
            }
        } catch (\Exception $e) {
            // Handle general errors
            Log::error("Error during verification: " . $e->getMessage());
            return response()->json([
                'error' => 'An error occurred during verification. Please try again later.',
            ], 500);
        }
    }

    private function sendVerify(Request $request)
{
    try {
        // // Regenerate the session ID to create a new session
        // $request->session()->regenerate();

        $request->validate([
            'telepon' => 'required|string', // Add validation for the phone number
        ]);

        // Generate a verification code (e.g., a random 6-digit code)
        $verificationCode = mt_rand(100000, 999999);

        // Store the verification code and expiration time as an array in the session
        $verificationData = [
            'code' => $verificationCode,
            'data' => json_encode(session('validated_data')),
        ];

        // session()->put('verification_data', $verificationData);
        // session()->save();
        
        sessionMod::create($verificationData);

        // Log the generated verification code and session data
        Log::info("Generated Verification Code: $verificationCode");
        //Log::info("Session Data Pada Saat Kirim Kode : ", session()->all());

        // Send the verification code via WhatsApp
        $phoneNumber = $request->input('telepon');
        $result = $this->sendVerificationCode($phoneNumber, $verificationCode);

        // Check if $result is an array
        if (is_array($result)) {
            $responseArray = $result; // $result is already an array, no need to decode

            // Sekarang, Anda bisa mengakses properti dari array respons
            if (isset($responseArray['status']) && $responseArray['status'] === true) {
                // Pengiriman berhasil

                $sessionId = session()->getId();
                return response()->json(['status' => 'success', 'session_id' => $sessionId]);
            } else {
                // Pengiriman gagal, kirim respons JSON error dengan alasan yang diberikan oleh layanan WhatsApp
                $reason = isset($responseArray['reason']) ? $responseArray['reason'] : 'Unknown error';
                return response()->json(['status' => 'error', 'message' => 'Failed to send verification code: ' . $reason], 500);
            }
        } else {
            // Handle the case where $result is not an array (possibly an error occurred during the API call)
            return response()->json(['status' => 'error', 'message' => 'Failed to send verification code. Please try again.'], 500);
        }
    } catch (\Exception $e) {
        // Handle exceptions and return an error response
        Log::error("Error during verification: " . $e->getMessage());
        return response()->json(['status' => 'error', 'message' => 'An error occurred during verification. Please try again later.'], 500);
    }
}
    /**
     * Send the verification code via Fontee API to the user's WhatsApp number.
     *
     * @param  string  $phoneNumber
     * @param  string  $verificationCode
     */ 
    private function sendVerificationCode($phoneNumber, $verificationCode)
    {
        $fonteeApiToken = env('FONNTE_API_TOKEN');
        $client = new Client();

        if (empty($fonteeApiToken)) {
            return response()->json(['error' => 'Invalid API token'], 401);
        }

        // Define the message and target phone number
        $message = "Your verification code: $verificationCode"; // Corrected message string
        $target = $phoneNumber;

        try {
            $response = $client->post(env("FONNTE_API_LINK"), [
                'headers' => [
                    'Authorization' => $fonteeApiToken,
                ],
                'json' => [
                    'message' => $message,
                    'target' => $target,
                ],
            ]);

            // Log the request and complete response for debugging
            Log::info('Fontee API Request:', [
                'url' => env("FONNTE_API_LINK"),
                'headers' => [
                    'Authorization' => $fonteeApiToken,
                ],
                'body' => [
                    'message' => $message,
                    'target' => $target,
                ],
            ]);
            Log::info('Fontee API Response:', json_decode($response->getBody(), true)); // Log complete response

            // Handle the response from Fontee API
            $body = $response->getBody();
            $result = json_decode($body);

            if ($result->status === true) {
                // Pengiriman berhasil
                return ['status' => 'success'];
            } else {
                // Pengiriman gagal, kirim respons JSON error dengan alasan yang diberikan oleh layanan WhatsApp
                return ['status' => 'error', 'reason' => $result->reason ?? 'Unknown error'];
            }
        } catch (\Exception $e) {
            // Tangani kesalahan yang mungkin terjadi selama pengiriman
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

}
