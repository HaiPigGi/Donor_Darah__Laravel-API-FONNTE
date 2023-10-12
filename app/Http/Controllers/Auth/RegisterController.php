<?php

namespace App\Http\Controllers\Auth;

use App\Classes\HelperSession;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use App\Models\Kelurahan;
use App\Models\Kecamatan;
use App\Models\Kabupaten;
use App\Models\Provinsi;
use App\Models\Profile;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\maps\ProvinsiController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cache;
use App\Models\SessionModels;

class RegisterController extends Controller
{
    protected $redirectTo = RouteServiceProvider::VERIFICATION;

    public function __construct()
    {
        $this->middleware('guest');
        $this->middleware('cors'); // Add the cors middleware to handle CORS requests
        // $this->middleware('web'); // Adds session middleware to the controller
    }

    public function index()
    {
        return view('auth.register');
    }

    public function createUser(array $data)
    {
        // Store the validated data in the session
        // Retrieve validated data from session
        $validatedData = session('validated_data');
        $session_id = session('session_id');
        Log::info("isi data semua dari create User : " . json_encode($data)); // Log the data as a JSON string
        Log::info("isi session ID : " . $session_id); // Log the session ID

        try {
            // Generate UUID for id_user column
            $id_user = Str::uuid();

            // Begin database transaction
            DB::beginTransaction();

            // Create user record with explicitly setting the 'id' field
            $user = User::create([
                'id' => $id_user,
                'nama' => $validatedData['nama'], // Menggunakan $validatedData['nama'] bukan $data['nama']
                'telepon' => $validatedData['telepon'],
            ]);

            // Retrieve validated data from session
            $validatedData = session('validated_data');

            // Create profile record with user_id and other validated data
            $profile = new Profile([
                'id_user' => $id_user,
                'nama' => $validatedData['nama'],
                'telepon' => $validatedData['telepon'],
                'golongan_darah' => $validatedData['golongan_darah'],
            ]);

            // Get kabupaten, kecamatan, and kelurahan IDs from validated data
            $provinsiId = $validatedData['provinsi_id'];
            $kabupatenId = $validatedData['kabupaten_id'];
            $kecamatanId = $validatedData['kecamatan_id'];
            $kelurahanId = $validatedData['kelurahan_id'];
            // Associate kabupaten, kecamatan, and kelurahan with the profile
            $profile->provinsi()->associate(Provinsi::find($provinsiId));
            $profile->kabupaten()->associate(Kabupaten::find($kabupatenId));
            $profile->kecamatan()->associate(Kecamatan::find($kecamatanId));
            $profile->kelurahan()->associate(Kelurahan::find($kelurahanId));
            $profile->save();

            // Delete data from sessionModel based on ID
            // Assuming your sessionModel has a column 'id' for primary key
            // Delete data from sessionModel based on ID
            sessionModels::where('session_id', $session_id)->delete();

            // Commit the database transaction
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            // Rollback the database transaction in case of an exception
            DB::rollback();
            Log::error("Error creating user: " . $e->getMessage()); // Log the error
            throw $e; // Re-throw the exception for further handling, if needed
        }
    }


    public function verify(Request $request)
    {
        try {
            Log::info('Request data:', $request->all());
            // Validate the input data
            $validatedData = $request->validate([
                'nama' => ['required', 'string', 'max:255'],
                'telepon' => ['required', 'string', 'max:255'],
                'golongan_darah' => ['required', 'string'],
                'provinsi_id' => ['exists:provinsi,id'],
                'kabupaten_id' => ['exists:kabupaten,id'],
                'kecamatan_id' => ['exists:kecamatan,id'],
                'kelurahan_id' => ['exists:kelurahan,id'],
            ]);

            // Store the validated data in the session
            session()->put(['validated_data' => $validatedData]);
            session()->save();

            Log::info('tes session:', Session::get('validated_data'));

            // Send the verification code
            $this->sendVerify($request);
            return response()->json(['message' => 'A verification code has been sent to your WhatsApp number.'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions that occurred during the sendVerify process
            return response()->json(['message' => 'Failed to send verification code. Please try again.', 'error' => $e->getMessage()], 500);
        }
    }
    public function validateCheck(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'code' => 'required|digits:6',
            ]);
            $userCode = $request->input('code');


            $getSession = SessionModels::all();

            // Log semua ID sesi ke file log
            Log::info("All Data : " . json_encode($getSession));

            if ($getSession !== null) {
                Log::info("All Data jika tidak null: " . json_encode($getSession));
                $sessionModel = SessionModels::first();
                // Ambil code dari objek tunggal
                $sessionCode = $sessionModel->code;

                // Log the session code
                Log::info("Session Code from Database: $sessionCode");

                if ($userCode === strval($sessionCode)) {

                    Log::info("User code : " . $userCode);
                    // Kode yang dimasukkan oleh pengguna cocok dengan kode sesi
                    $sessionDataArray = json_decode($sessionModel->data, true);

                    // Periksa apakah dekoding berhasil
                    if ($sessionDataArray === null && json_last_error() !== JSON_ERROR_NONE) {
                        // Penanganan kesalahan jika dekoding gagal
                        Log::error("Failed to decode JSON data: " . json_last_error_msg());
                        return response()->json([
                            'error' => 'Failed to decode JSON data.',
                        ], 500); // Kode status 500 menunjukkan kesalahan server
                    }

                    // Simpan session ID ke dalam sesi
                    session()->put('session_id', $sessionModel->session_id);
                    // Simpan validated_data ke dalam sesi
                    session()->put('validated_data', $sessionDataArray);

                    // Log data ke dalam file log
                    Log::info("Data Session Database: " . json_encode($sessionDataArray));
                    $user = $this->createUser($sessionDataArray);
                    // Log the successful creation of the user
                    Log::info("User has been verified and created. User ID: $user->id");

                    return response()->json([
                        'message' => 'User has been verified and created.',
                        'user' => $user,
                    ]);
                } else {
                    // Kode yang dimasukkan oleh pengguna tidak cocok dengan kode sesi
                    Log::info("Invalid verification code received: $userCode");

                    throw ValidationException::withMessages([
                        'code' => ['Invalid verification code. Please try again.'],
                    ]);
                }
            } else {
                // Log the invalid verification code
                Log::info("Invalid session ID received: $getSession");

                throw ValidationException::withMessages([
                    'session_id' => ['Invalid session ID. Please try again.'],
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


    public function sendVerify(Request $request)
    {
        try {
            $request->validate([
                'telepon' => 'required|string', // Add validation for the phone number
            ]);

            // Generate a verification code (e.g., a random 6-digit code)
            $verificationCode = mt_rand(100000, 999999);

            // Store the verification code and expiration time as an array in the session
            $verificationData = [
                'code' => $verificationCode,
                'session_id' => session()->getId(),
                'data' => json_encode(session('validated_data')),
            ];

            session()->put('verification_data', $verificationData);
            session()->save();

            SessionModels::create($verificationData);

            // Log the generated verification code and session data
            Log::info("Generated Verification Code: $verificationCode");
            Log::info("Session Data Pada Saat Kirim Kode : ", session()->all());

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
    public function sendVerificationCode($phoneNumber, $verificationCode)
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
            $response = $client->post('https://api.fonnte.com/send', [
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
                'url' => 'https://api.fonnte.com/send',
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


    public function getExpectedVerificationCode()
    {
        $verificationData = session('verification_data');

        if ($verificationData && isset($verificationData['code'])) {
            return $verificationData['code'];
        } else {
            // Kembalikan nilai default atau pesan error sesuai kebutuhan aplikasi Anda
            return null;
        }
    }
}