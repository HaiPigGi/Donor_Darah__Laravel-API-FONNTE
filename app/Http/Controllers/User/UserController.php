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
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;


class UserController extends Controller
{
    /**
     * Get messages associated with a tagar.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    protected function getUserDetails()
    {
        try {
            // Get the authenticated user using the JWT token
            $token = JWTAuth::getToken();
            Log::info('Request data:'.json_encode($token));
    
            $user = JWTAuth::toUser($token);
    
            // Check if the user exists
            if (!$user) {
                return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
            }
    
            // Find the user's profile by ID
            $profile = profileModel::where('id_user', $user->id)->firstOrFail();
    
            // Get the name of the kelurahan using kelurahan_id
            $kelurahanName = '';
            if ($profile->kelurahan_id) {
                $kelurahan = Kelurahan::find($profile->kelurahan_id);
                if ($kelurahan) {
                    $kelurahanName = $kelurahan->nama;
                }
            }
    
            // Get the user's details
            $userData = [
                'id' => $user->id,
                'nama' => $user->nama,
                'telepon' => $user->telepon,
                'ktp' => $profile->ktp,
                'pekerjaan' => $profile->pekerjaan,
                'golongan_darah' => $profile->golongan_darah,
                'kelurahan_id' => $profile->kelurahan_id,
                'kelurahan_nama' => $kelurahanName, // Add kelurahan_name to userData
                'tagar_id' => $profile->tagar_id
            ];
    
            // Return user details as JSON
            return response()->json(['status' => 'success', 'user' => $userData]);
        } catch (\Exception $e) {
            // Handle the exception, for example, return a 404 response for not found
            Log::error('Exception occurred while getUserDetail Message: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }
    }
  protected function updateUser(Request $request, $userId)
{
    try {
        // Begin database transaction
        DB::beginTransaction();
        Log::info('Request data:', $request->all());

        // Find the user by ID
        $user = User::findOrFail($userId);

        // Update user details
        $user->nama = $request->input('nama');
        $user->telepon = $request->input('telepon');
        // Add other fields as needed

        $user->save();

        // Find the user's profile by ID
        $profile = ProfileModel::where('id_user', $userId)->firstOrFail();

        // Update profile details
        $profile->ktp = $request->input('ktp');
        $profile->pekerjaan = $request->input('pekerjaan');
        $profile->golongan_darah = $request->input('golongan_darah');

        // Get kelurahan ID from the request
        $kelurahanId = $request->input('kelurahan_id');

        // Set kelurahan_id directly on the profile
        $profile->kelurahan_id = $kelurahanId;

        // Save the profile
        $profile->save();

        // Commit the database transaction
        DB::commit();

        return response()->json(['status' => 'success', 'message' => 'User and profile updated successfully']);
    } catch (\Exception $e) {
        // Rollback the database transaction in case of an exception
        DB::rollback();
        Log::error('Exception occurred while updating user and profile: ' . $e->getMessage());
        return response()->json(['status' => 'error', 'message' => 'Failed to update user and profile'], 500);
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
                    'nama' =>$profile->nama,
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
