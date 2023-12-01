<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
class UserController extends Controller
{


    /**
     * Get messages associated with a tagar.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */

    protected function getUserDetails($userId)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($userId);
            Log::info("cek User : ".json_encode($user));
            // Get the user's name
            $userName = $user->nama;
            // Return user details as JSON
            return response()->json(['users' => ['id' => $user->id, 'nama' => $userName]]);
        } catch (\Exception $e) {
            // Handle the exception, for example, return a 404 response for not found
            Log::error('Exception occurred while getUserDetail Message: ' . $e->getMessage());
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
