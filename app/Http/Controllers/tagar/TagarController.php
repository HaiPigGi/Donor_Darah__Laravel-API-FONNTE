<?php

namespace App\Http\Controllers\tagar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TagarModel;
use App\Models\TagarUserMod;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
         // Log all Tagar IDs
         Log::info('Tagar ID requested: ' . $tagarId);
         $tagar = TagarModel::find($tagarId);
         Log::info("Cek semua id dari database : " . json_encode($tagar));
     
         if (!$tagar) {
             return response()->json(['error' => 'Tagar not found'], 404);
         }
     
         // Check if the user is authenticated
         if (!Auth::check()) {
             return response()->json(['error' => 'You must be logged in to choose a tagar.'], 401);
         }
     
         // Get the authenticated user
         $user = Auth::user();
         Log::info("Cek User : " . json_encode($user));
     
         // Begin a database transaction
         DB::beginTransaction();
     
         try {
             // Attach the user to the tagar
             $tagar->users()->attach($user->id, ['id_user' => $user->id]);
     
             Log::info("Cek isi Tagar : " . json_encode($tagar->id));
             // Update the jumlah_pengguna column
             $tagar->increment('jumlah_pengguna');
     
             // Save changes to the tagar model
             $tagar->save();
             Log::info("Cek isi User : " . json_encode($user->id));
     
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
     }
     


}
