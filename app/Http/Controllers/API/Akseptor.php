<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\akseptor_model;
use App\Models\Kelurahan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
class Akseptor extends Controller
{

    /**
     * Send the verification code via Fontee API to the user's WhatsApp number.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function validateData(Request $request)
    {
        try {
            Log::info('request Data Akseptor', $request->all());
            $validator = Validator::make($request->all(), [
                'nama' => ['required', 'string', 'max:255'],
                'telepon' => ['required', 'string', 'max:255'],
                'tanggal_lahir' => ['required', 'date', 'date_format:m/d/Y'],
                'golongan_darah' => ['required', 'string'],
                'kelurahan_id' => ['exists:kelurahan,id'],
                'tujuan_Pengajuan' => ['required', 'string', 'max:255'], // Update the key here
                'image'  => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            ]);
    
            if ($validator->fails()) {
                Log::info('Error cause in validator: ' . $validator->errors());
                return back()->withErrors($validator);
            }
    
            $validateData = $validator->validated();
    
            $this->storeAkseptor($request, $validateData);
            Log::info("data Validate", ['data' => $validateData]);
            return response()->json(['message' => 'Verification data is valid']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to validate data. Please try again.', 'error' => $e->getMessage()], 500);
        }
    }
    

    public function storeAkseptor(Request $request, array $validateData)
    {
        try {
            DB::beginTransaction();

            $image = $request->file('image');

            // Create the storage directory if it doesn't exist
            $directory = 'akseptor';

            if (!Storage::exists($directory)) {
                Storage::makeDirectory($directory);
            }

            // Store the image in the specified directory with a unique filename
            $imagePath = $image->storeAs($directory, $image->hashName());

             // Parse the date using Carbon
            $tanggal_lahir = Carbon::createFromFormat('m/d/Y', $request->input('tanggal_lahir'));


            // Create the akseptor model instance
            $user = akseptor_model::create([
                'nama' => $validateData['nama'],
                'telepon' => $validateData['telepon'],
                'tanggal_lahir' => $tanggal_lahir,
                'golongan_darah' => $validateData['golongan_darah'],
                'tujuan_Pengajuan' => $validateData['tujuan_Pengajuan'],
                'image' => $imagePath,
            ]);

    
            $kelurahanId = $validateData['kelurahan_id'];

            // Associate the user with the Kelurahan model
            $user->kelurahan()->associate(Kelurahan::find($kelurahanId));
            $user->save();

            // Commit the database transaction
            DB::commit();

            Log::info('Akseptor Has Been Created', ['user_id' => $user->id, 'name' => $user->nama]);


            return $user;
        } catch (\Exception $e) {
                DB::rollback();
                Log::error("Error creating Akseptor: " . $e->getMessage());
                return response()->json(['message' => 'Failed to store Akseptor data. Please try again.', 'error' => $e->getMessage()], 500);
       
            
            }
            
        }
    }

