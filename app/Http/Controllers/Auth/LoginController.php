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

            if ($user) {
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

                return response()->json([
                    'message' => 'A verification code has been sent to your WhatsApp number.',
                    'user_id' => $user->id,
                    'verification_code' => $verificationCode,
                ], 200);
            } else {
                // If user not found
                return response()->json(['message' => 'Invalid phone number.'], 401);
            }
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            Log::error("Error during login: " . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'Failed to send verification code. Please try again later.'], 500);
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



