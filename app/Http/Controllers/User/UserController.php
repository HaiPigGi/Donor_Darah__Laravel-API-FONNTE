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

    // public function getUserLocation($userId)
    // {
    //     try {
    //         // Retrieve the user's profile
    //         $profile = profileModel::where('id_user', $userId)->first();

    //         if (!$profile) {
    //             return response()->json(['error' => 'User profile not found'], 404);
    //         }

    //         // Retrieve kelurahan data
    //         $kelurahanData = Kelurahan::find($profile->kelurahan_id);

    //         if (!$kelurahanData) {
    //             return response()->json(['error' => 'Kelurahan not found'], 404);
    //         }

    //         // Retrieve kecamatan data
    //         $kecamatanData = Kecamatan::find($kelurahanData->kecamatan_id);

    //         if (!$kecamatanData) {
    //             return response()->json(['error' => 'Kecamatan not found'], 404);
    //         }

    //         // Retrieve kabupaten data with latitude and longitude
    //         $kabupatenData = Kabupaten::find($kecamatanData->kabupaten_id);

    //         if (!$kabupatenData) {
    //             return response()->json(['error' => 'Kabupaten not found'], 404);
    //         }   
    //         // Return the data
    //         return response()->json([
    //             'kabupaten' => [
    //                 'id' => $kabupatenData->id,
    //                 'name' => $kabupatenData->nama,
    //                 'lat' => $kabupatenData->lat,
    //                 'long' => $kabupatenData->long,
    //             ],
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'An error occurred. Please try again.'], 500);
    //     }
    // }
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
    


    
}
