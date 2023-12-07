<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Models\profileModel;
use App\Models\Kelurahan;
use App\Models\Kecamatan;
use App\Models\Kabupaten;
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

    public function getUserLocation()
    {
        try {
            // Retrieve all profiles
            $profiles = profileModel::all();
    
            // Initialize an empty array to store user locations
            $userLocations = [];
    
            foreach ($profiles as $profile) {
                // Retrieve kelurahan data
                $kelurahanData = Kelurahan::find($profile->kelurahan_id);
    
                if (!$kelurahanData) {
                    // Skip to the next iteration if kelurahan not found
                    continue;
                }
    
                // Retrieve kecamatan data
                $kecamatanData = Kecamatan::find($kelurahanData->kecamatan_id);
    
                if (!$kecamatanData) {
                    // Skip to the next iteration if kecamatan not found
                    continue;
                }
    
                // Retrieve kabupaten data with latitude and longitude
                $kabupatenData = Kabupaten::find($kecamatanData->kabupaten_id);
    
                if (!$kabupatenData) {
                    // Skip to the next iteration if kabupaten not found
                    continue;
                }
    
                // Add the user location to the array
               // Add the user location to the array
                $userLocations[] = [
                    'lat' => $kabupatenData->lat,
                    'long' => $kabupatenData->long,
                ];

                // Return the data

                }

                return response()->json(['user_locations' => $userLocations]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred. Please try again.'], 500);
        }
    }
    
    protected function checkNumber(Request $request) {

        try {
            Log::info('Request data:', $request->all());
    
            // Validate the request data
            $validatedData = $request->validate([
                'telepon' => ['required', 'string', 'max:255'],
            ]);
        
            // Check if the phone number already exists in the database (excluding the current user)
            $existingUser = User::where('telepon', $validatedData['telepon'])
                ->where('id', '!=', optional($request->user())->id)
                ->first();
        
            if ($existingUser) {
                // Phone number already exists for another user
                return response()->json(['message' => 'Phone number is already in use by another user'], 200);
            }
        
            // Phone number is available    
            return response()->json(['message' => 'Phone number is available'], 200);
        } catch (\Throwable $th) {
            return response()->json(['message'=>'error Server ',500]);
            //throw $th;
        }
       
    }
    
    


    
}
