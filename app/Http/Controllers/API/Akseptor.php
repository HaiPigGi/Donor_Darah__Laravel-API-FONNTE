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
     * Validate Data For An Akseptor 
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
                'ktp' => ['required', 'string','max:255'],
                'golongan_darah' => ['required', 'string'],
                'jumlah_kantong' => ['required', 'string'],
                'kelurahan_id' => ['exists:kelurahan,id'],
                'alamat' => ['string'],
                'tujuan_Pengajuan' => ['required', 'string', 'max:255'],
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
    
    

    private function storeAkseptor(Request $request, array $validateData)
    {
        try {
            DB::beginTransaction();
            
            // Create the akseptor model instance
            $user = akseptor_model::create([
                'nama' => $validateData['nama'],
                'telepon' => $validateData['telepon'],
                'ktp' => $validateData['ktp'],
                'golongan_darah' => $validateData['golongan_darah'],
                'jumlah_kantong' => $validateData['jumlah_kantong'],
                'tujuan_Pengajuan' => $validateData['tujuan_Pengajuan'],
                'alamat' => $validateData['alamat'],
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

