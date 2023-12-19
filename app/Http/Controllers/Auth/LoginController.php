<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\sessionModels;
use GuzzleHttp\Client;
use App\Models\sessionMod;
use Tymon\JWTAuth\Facades\JWTAuth;
class LoginController extends Controller
{

   // use AuthenticatesUsers;

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

        if (!$user) {
            return response()->json(['message' => 'Invalid phone number.'], 401);
        }

        // Extract user ID
        $userId = $user->id;
        Log::info("cek user id dari database : ".json_encode($userId));

        // Generate a verification code
        $verificationCode = mt_rand(100000, 999999);

        // Create a new session record in the SessionModels table
        $sessionUserLogin = SessionModels::create([
            'code' => $verificationCode,
            'data' => json_encode(['telepon' => $request->input('telepon'), 'id' => $userId]),
        ]);
        

        // Store the verification data in the session
        session()->put('verification_data', $sessionUserLogin);
        session()->save();

        // Log the generated verification code and session data
        Log::info("Generated Verification Code for Login: $verificationCode");
        Log::info("Session Data for Login: ", session()->all());

        // Send verification code
        $this->sendVerificationCode($user->telepon, $verificationCode);

        return response()->json([
            'message' => 'A verification code has been sent to your WhatsApp number.',
            'user_id' => $userId, // Include the user ID in the response
            'verification_code' => $verificationCode,
        ], 200);
    } catch (\Exception $e) {
        // Handle exceptions and return an error response
        Log::error("Error during login: " . $e->getMessage());
        return response()->json(['status' => 'error', 'message' => 'Failed to send verification code. Please try again later.'], 500);
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
          Log::info("All Data From Database : " . json_encode($sessionMod));
    
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
             // Retrieve the user ID from the session data
             $userId = $sessionDataArray['id'];

              // Ensure the user exists
            $user = User::find($userId);

            if (!$user) {
                return response()->json([
                    'error' => 'User not found.',
                ], 404);
            }

            // Generate JWT token
            $token = JWTAuth::fromUser($user);
            Log::info("Cek Token JWT Untuk Login : " . json_encode($token));

            // Return the token and other user information in the response
            return response()->json([
                'message' => 'Successfully OTP Verification.',
                'id' => $userId,
                'role' => $user->role,
                'token' => $token, // Include the JWT token in the response
            ]);
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

public function logout()
{
    try {
        // Get the authenticated user using the JWT token
        $token = JWTAuth::getToken();

        if (!$token) {
            return response()->json(['message' => 'Token not provided.'], 401);
        }

        $user = JWTAuth::toUser($token);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        // Get the user ID
        $userId = $user->id;
        Log::info("User ID for Logout: " . json_encode($userId));

        // Logout user
        Auth::logout();

        // Find and delete the session record associated with the user
        $sessionData = SessionModels::where('data', 'LIKE', '%"id":"' . $userId . '"%')->first();

        // Regardless of whether the session data is found or not, proceed with logout
        if ($sessionData) {
            $sessionData->delete();
        }

        // Invalidate session and regenerate CSRF token
        session()->invalidate();
        session()->regenerateToken();

        return response()->json(['message' => 'User logged out successfully.'], 200);
    } catch (\Exception $e) {
        // Handle exceptions and return an error response
        Log::error("Error during logout: " . $e->getMessage());
        return response()->json(['status' => 'error', 'message' => 'Failed to logout. Please try again later.'], 500);
    }
}


private function sendVerificationCode($phoneNumber, $verificationCode)
    {
        $fonteeApiToken = env('FONNTE_API_TOKEN');
        $client = new Client();

        if (empty($fonteeApiToken)) {
            return response()->json(['error' => 'Invalid API token'], 401);
        }

        // Define the message and target phone number
<<<<<<< HEAD
        $message = "Welcome Back 😊\n\n Ini Adalah Kode Verifikasi Kamu\n\n🎁 Kode Verifikasi: $verificationCode\n\ndonordarahbersama.com";
=======
        $message = "
        🌟 Selamat datang kembali! Kami rindu,
        😊 Dalam suasana ceria dan berbunga.
        🚀 Bersiaplah, kode verifikasi siap hadir,
        🌈 Hiasi harimu, oh saudara yang terpilih.
    
        🌺 Pantun:
        📜 Pagi cerah, senyummu bersinar,
        🎉 Kode verifikasi, tanda kembalimu.
        💌 Donordarahbersama.com, tempat bakti abadi,
        🤝 Selamat datang, di keluarga sejati.
    
        🎁 Kode Verifikasi: $verificationCode
    ";
>>>>>>> origin/main

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



