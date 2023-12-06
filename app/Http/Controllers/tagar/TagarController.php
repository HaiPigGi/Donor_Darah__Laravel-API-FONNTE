<?php

namespace App\Http\Controllers\tagar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TagarModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\profileModel;
class TagarController extends Controller
{
 /**
     * Send the verification code via Fontee API to the user's WhatsApp number.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    
     public function store(Request $request)
    {
        // Check if the user is authenticated
        if (!Auth::check()) {
            return response()->json(['error' => 'You must be logged in to create a tagar.'], 401);
        }

        $request->validate([
            'nama_tagar' => 'required|string|max:255|unique:tagars',
        ]);

        $user = Auth::user(); // Get the authenticated user

        TagarModel::create([
            'nama_tagar' => $request->input('nama_tagar'),
        ]);

        return response()->json(['success' => 'Tagar created successfully'],200);
    }

     /**
     * Send the verification code via Fontee API to the user's WhatsApp number.
     *
     * @param  $tagarId
     */

     public function chooseTagar($tagarId)
     {
         try {
             // Log all Tagar IDs
             Log::info('Tagar ID requested: ' . $tagarId);
     
             // Check if the user is authenticated
             if (!Auth::check()) {
                 return response()->json(['error' => 'You must be logged in to choose a tagar.'], 401);
             }
     
             // Get the authenticated user
             $user = Auth::user();
             $idUser = $user->id;
            //  Log::info("User ID: " . json_encode($idUser));
             $userProfile = profileModel::where('id_user', $idUser)->firstOrFail();
            //  Log::info("cek profile berdasarkan id : ".json_encode($userProfile));

             // Find the tagar
             $tagar = TagarModel::find($tagarId);
     
             if (!$tagar) {
                 return response()->json(['error' => 'Tagar not found'], 404);
             }
     
             // Begin a database transaction
             DB::beginTransaction();
     
             try {
             // Check if the user already has a profile
            $profile = $user->profile;

            if (!$profile) {
                // If the user doesn't have a profile, find an existing one by telepon
                $existingProfile = profileModel::where('telepon', $userProfile->telepon)->first();

                if ($existingProfile) {
                    // If an existing profile is found, update it
                    $profile = $existingProfile;
                } else {
                    // If no existing profile is found, create a new one
                    $profile = new profileModel();
                    $profile->id_user = $user->id;
                    $profile->nama = $userProfile->nama;
                    $profile->telepon = $userProfile->telepon;
                    $profile->golongan_darah = $userProfile->golongan_darah ?? 'default_value';
                    $profile->ktp = $userProfile->ktp;
                    $profile->pekerjaan = $userProfile->pekerjaan;
                    $profile->kelurahan_id = $userProfile->kelurahan_id;
                }
            } elseif ($profile->tagar_id) {
                // Handle the case where the profile already has a tagar assigned
                return response()->json(['error' => 'Profile already associated with a tagar'], 400);
            }
            // Check if the profile already has a tagar_id
            if ($profile->tagar_id) {
                return response()->json(['error' => 'Profile already chosen a tagar'], 400);
            }

            // Set the tagar_id
            $profile->tagar_id = $tagar->id;
            $profile->save();

            // Update the jumlah_pengguna column
            $tagar->increment('jumlah_pengguna');

            // Save changes to the tagar model
            $tagar->save();

            // Commit the transaction
            DB::commit();
                 return response()->json(['success' => 'Tagar chosen successfully', 'tagar' => $tagar], 200);
             } catch (\Exception $e) {
                 // Rollback the transaction in case of an exception
                 DB::rollback();
                 // Log the exception details for debugging
                 Log::error('Exception occurred while choosing tagar: ' . $e->getMessage());
     
                 return response()->json(['error' => 'Failed to choose tagar. Please try again.'], 500);
             }
         } catch (\Exception $e) {
             // Handle other exceptions if needed
             return response()->json(['error' => 'An error occurred. Please try again.'], 500);
         }
     }
     
     
     


}
