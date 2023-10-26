<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\sessionModels;
use GuzzleHttp\Client;

class LoginController extends Controller
{

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        try {
            // Validate phone number
            $request->validate([
                'telepon' => 'required|string',
            ]);

            // Check if the user with the phone number exists in the database
            $user = User::where('telepon', $request->telepon)->first();

            // Generate a verification code
            $verificationCode = mt_rand(100000, 999999);

            // Create a new session record in the SessionModels table
            $sessionUserLogin = SessionModels::create([
                'code' => $verificationCode,
                'data' => json_encode(['telepon' => $request->input('telepon'), 'id' => $user->id]),
            ]);

            // Store the verification data in the session
            session()->put('verification_data', $sessionUserLogin);
            session()->save();

            // Log the generated verification code and session data
            Log::info("Generated Verification Code for Login: $verificationCode");
            Log::info("Session Data for Login: ", session()->all());
            $phoneNumber = $request->input('telepon');
            // Send verification code
            $result = $this->sendVerificationCode($phoneNumber, $verificationCode);

            // Check if $result is an array
            if (is_array($result)) {
                $responseArray = $result; // $result is already an array, no need to decode

                // Sekarang, Anda bisa mengakses properti dari array respons
                if (isset($responseArray['status']) && $responseArray['status'] === false) {
                    // Pengiriman gagal, kirim respons JSON error dengan alasan yang diberikan oleh layanan WhatsApp
                    $reason = isset($responseArray['reason']) ? $responseArray['reason'] : 'Unknown error';
                    return response()->json(['status' => 'error', 'message' => 'Failed to send verification code: ' . $reason], 500);
                } else {
                    return response()->json(['status' => 'success']);
                }
            } else {
                // Handle the case where $result is not an array (possibly an error occurred during the API call)
                return response()->json(['status' => 'error', 'message' => 'Failed to send verification code. Please try again.'], 500);
            }
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            Log::error("Error during login: " . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Failed to send verification code. Please try again later.'], 500);
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
        $message = "Your verification code: $verificationCode";
        $target = $phoneNumber;

        try {
            $response = $client->post('https://api.fonnte.com/send', [
                'headers' => [
                    'Authorization' => $fonteeApiToken,
                    'Content-Type' => 'application/json', // Set content type to JSON
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
                    'Content-Type' => 'application/json',
                ],
                'body' => [
                    'message' => $message,
                    'target' => $target,
                ],
            ]);
            Log::info('Fontee API Response:', json_decode($response->getBody(), true));

            // Handle the response from Fontee API
            $result = json_decode($response->getBody());

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



    public function validateCheck(Request $request)
    {
        try {
            // Validate the request data
            $request->validate([
                'code' => 'required|digits:6',
            ]);
            $userCode = $request->input('code');

            // Retrieve verification data from the session
            $sessionUserLogin = session()->get('verification_data');

            if ($sessionUserLogin !== null) {
                // Decode session data
                $sessionDataArray = json_decode($sessionUserLogin->data, true);

                // Verify the user input with the stored verification code
                if ($userCode === strval($sessionUserLogin->code)) {
                    // Kode yang dimasukkan oleh pengguna cocok dengan kode sesi

                    // Retrieve the user ID from the session data
                    $userId = $sessionDataArray['id'];

                    // Perform the login action
                    Auth::loginUsingId($userId);

                    // Clear the verification data from the session
                    session()->forget('verification_data');

                    return response()->json([
                        'message' => 'Login Successful',
                        'user_id' => $userId,
                    ]);
                } else {
                    // Kode yang dimasukkan oleh pengguna tidak cocok dengan kode sesi
                    Log::info("Invalid verification code received: $userCode");

                    throw ValidationException::withMessages([
                        'code' => ['Invalid verification code. Please try again.'],
                    ]);
                }
            } else {
                // Invalid session data
                Log::info("Invalid session data received");

                throw ValidationException::withMessages([
                    'session_id' => ['Invalid session data. Please try again.'],
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

    public function logout(Request $request)
    {
        try {
            // Pastikan pengguna sudah terautentikasi
            if (Auth::check()) {
                // Dapatkan ID pengguna yang terautentikasi sebelum logout
                $userId = Auth::id();

                // Logout pengguna
                Auth::logout();

                // Cari sessionModel berdasarkan ID pengguna
                $sessionData = sessionModels::where('data', 'like', '%"id":' . $userId . '%')->first();

                if ($sessionData) {
                    // Hapus sessionModel dari database
                    $sessionData->delete();

                    // Invalidate sesi dan regenerasi token CSRF
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();

                    // Return ID pengguna bersama dengan respons logout
                    return response()->json(['message' => 'User Logout', 'user_id' => $userId], 200);
                } else {
                    // Jika sessionModel tidak ditemukan, tangani sesuai kebutuhan (misalnya, arahkan ulang ke halaman login)
                    return response()->json(['message' => 'Invalid session data'], 401);
                }
            } else {
                // Jika pengguna belum terautentikasi, tangani sesuai kebutuhan (misalnya, arahkan ulang ke halaman login)
                return response()->json(['message' => 'User not authenticated'], 401);
            }
        } catch (\Exception $e) {
            // Tangani pengecualian dan kembalikan respons kesalahan
            Log::error("Error during logout: " . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Failed to logout. Please try again later.'], 500);
        }
    }
}
