<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class RegisterController extends Controller
{
    protected $redirectTo = RouteServiceProvider::VERIFICATION;

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function index()
    {
        return view('auth.register');
    }

    private function createUser(array $data)
{
    // Store the validated data in the session
    session(['validated_data' => $data]);

    // Retrieve the random_password from the session
    $randomPassword = session('random_password');

    // Create the user with the provided data and random password
    return User::create([
        'name' => $data['name'],
        'password' => Hash::make($randomPassword), // Use the random_password from the session
        'telepon' => $data['telepon'],
        'golongan_darah' => $data['golongan_darah'],
    ]);
}

    public function verify(Request $request)
    {
        try {
            // Validate the input data
            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'telepon' => ['required', 'string', 'unique:users'],
                'golongan_darah' => ['required', 'string'],
            ]);

            // Store the validated data in the session
            session(['validated_data' => $validatedData]);

            // Send the verification code
            $this->sendVerify($request);

            // Redirect the user to the verification code input form
            return redirect()->route('verify')->with('success', 'A verification code has been sent to your WhatsApp number.');
        } catch (\Exception $e) {
            // Handle any exceptions that occurred during the sendVerify process
            return redirect()->route('verify')->with('error', 'Failed to send verification code. Please try again.');
        }
    }

    public function validateCheck(Request $request)
{
    // Retrieve the previously validated data from the session
    $validatedData = session('validated_data');

    // Dump the retrieved data for debugging
    dump($validatedData);

    $request->validate([
        'code' => 'required|digits:6', // Assuming the verification code is 6 digits long
    ]);

    $expectedCode = $this->getExpectedVerificationCode();

    if ($request->code == $expectedCode) {
        // Use the retrieved validated data to create the user
        $user = $this->createUser($validatedData);

        return redirect()->route('home')->with('success', 'User has been verified and created.');
    } else {
        return redirect()->route('verify')->with('error', 'Invalid verification code. Please try again.');
    }
}
    public function sendVerify(Request $request)
    {
        $request->validate([
            'telepon' => 'required|string', // Add validation for the phone number
        ]);

        // Generate a verification code (e.g., a random 6-digit code)
        $verificationCode = mt_rand(100000, 999999);

         // Generate a random password (8 characters)
         $randomPassword = Str::random(8);


        // Store the verification code in the session
        session([
            'expected_verification_code' => $verificationCode,
            'random_password' => $randomPassword,
        ]);

        // Send the verification code via WhatsApp
        $phoneNumber = $request->input('telepon');
        $this->sendVerificationCode($phoneNumber, $verificationCode,$randomPassword);

        // Return a success message without a redirect
        return back()->with('success', 'A verification code has been sent to your WhatsApp number.');
    }

  /**
 * Send the verification code via Fontee API to the user's WhatsApp number.
 *
 * @param  string  $phoneNumber
 * @param  string  $verificationCode
 * @param  string  $randomPass
 */
private function sendVerificationCode($phoneNumber, $verificationCode, $randomPass)
{
    $fonteeApiToken = env('FONNTE_API_TOKEN');
    $client = new Client();

    // Define the message and target phone number
    $message = "Your verification code: $verificationCode\nYour Password: $randomPass"; // Corrected message string
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

        // Handle the response from Fontee API if needed
        $body = $response->getBody();
        $result = json_decode($body);

        if ($result->status === true) {
            return response()->json(['status' => 'success']);
        } else {
            return response()->json(['status' => 'error', 'reason' => $result->reason], 500);
        }
    } catch (\Exception $e) {
        return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
    }
}


    private function getExpectedVerificationCode()
    {
        return session('expected_verification_code');
    }
}
