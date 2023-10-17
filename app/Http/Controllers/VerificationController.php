<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController;
class VerificationController extends Controller
{
    public function index()
    {
        return view('auth.verifyNo');
    }

}



