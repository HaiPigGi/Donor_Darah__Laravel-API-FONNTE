<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
class LoginController extends Controller
{

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function index()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        // Validate the form data
        $request->validate([
            'telepon' => 'required|string', // Use 'string' for phone number validation
            'password' => 'required',
        ]);

        // Attempt to log in the user using the phone number and password
        if (Auth::attempt(['telepon' => $request->telepon, 'password' => $request->password])) {
            // Authentication successful
            return redirect()->route('home')->with('Login Succcessfully');
        }
        // Authentication failed
        return redirect()->back()->withInput($request->only('telepon'))->withErrors(['telepon' => 'Invalid credentials']);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
