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
use App\Models\profileModel;
use App\Models\Kecamatan;
use App\Models\Kabupaten;
use App\Models\provinsi;
use GuzzleHttp\Client;  
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

            // Konversi kelurahan_id ke integer jika tipe datanya adalah string
            $validateData['kelurahan_id'] = is_numeric($validateData['kelurahan_id'])
                ? (int) $validateData['kelurahan_id']
                : $validateData['kelurahan_id'];
                Log::info("data Validate sehabis kelurahan id", ['data' => $validateData]);
    
            $this->storeAkseptor($request, $validateData);
<<<<<<< HEAD
            // $findUserIDWithTelepon = akseptor_model::where('telepon', $validateData['telepon'])->orderBy('created_at', 'desc')->firstOrFail();
            // // Mengambil ID dari model yang baru saja dibuat
            // $userID = $findUserIDWithTelepon->id;
            // $updateResponse = $this->updateDataAkse($request, $userID);

            // // Check the status code and handle accordingly
            // if ($updateResponse->getStatusCode() == 404) {
            //     // Handle the 404 error response
            //     return response()->json(['message' => 'Update failed: Golongan Darah Is Not Found or Telepon is Empty'], 404);
            // }
=======
            $findUserIDWithTelepon = akseptor_model::where('telepon', $validateData['telepon'])->firstOrFail();
            // Mengambil ID dari model yang baru saja dibuat
            $userID = $findUserIDWithTelepon->id;
            $this->updateDataAkse($request,$userID);
>>>>>>> origin/main
            Log::info("data Validate", ['data' => $validateData]);
            return response()->json(['message' => 'Verification data is valid']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to validate data. Please try again.', 'error' => $e->getMessage()], 500);
        }
    }

<<<<<<< HEAD
=======
    
    
>>>>>>> origin/main
        private function storeAkseptor(Request $request, array $validateData)
    {
        try {
            DB::beginTransaction();
            $kelurahanId = str_replace([' ', ','], '', $validateData['kelurahan_id']);
            Log::info('Kelurahan ID to insert: ' . $kelurahanId);
            Log::info('Attempting to associate kelurahan with ID: ' . $kelurahanId);
    
            
            // // // Attempt to find the Kelurahan model by ID
            // $kelurahanNew = Kelurahan::findOrFail($kelurahanId);
    
            //  if (!$kelurahanNew) {
            //     Log::info('Kelurahan not found in the database for ID: ' . $kelurahanId);
            //     return response()->json(['message' => 'Kelurahan not found'], 404);
            // }
    
            // Create the akseptor model instance
            $user = akseptor_model::create([
                'nama' => $validateData['nama'],
                'telepon' => $validateData['telepon'],
                'ktp' => $validateData['ktp'],
                'golongan_darah' => $validateData['golongan_darah'],
                'jumlah_kantong' => $validateData['jumlah_kantong'],
                'kelurahan_id' => $kelurahanId,
                'tujuan_Pengajuan' => $validateData['tujuan_Pengajuan'],
                'alamat' => $validateData['alamat'],
            ]);
    
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

        private function getAkeptorProvinsiByTelepon($telepon)
        {
            try {
                // Find the Akseptor by telephone number
                $akseptor = profileModel::where('telepon', $telepon)->first();
                Log::info('Checking telepon in getAkeptorProvinsiByTelepon: ' . $telepon);
        
                if (!$akseptor) {
                    Log::error('Akseptor not found for the provided telephone number: ' . $telepon);
                    return ['error' => 'Akseptor not found for the provided telephone number'];
                }
        
                // Retrieve kelurahan data
                $kelurahanData = Kelurahan::find($akseptor->kelurahan_id);
        
                if (!$kelurahanData) {
                    Log::error('Kelurahan not found for telepon ' . $telepon . ': ' . $akseptor->kelurahan_id);
                    return ['error' => 'Kelurahan not found'];
                }
        
                // Retrieve kecamatan data
                $kecamatanData = Kecamatan::find($kelurahanData->kecamatan_id);
        
                if (!$kecamatanData) {
                    // Log::error('Kecamatan not found for telepon ' . $telepon . ': ' . $kelurahanData->kecamatan_id);
                    return ['error' => 'Kecamatan not found'];
                }
        
                // Retrieve kabupaten data with latitude and longitude
                $kabupatenData = Kabupaten::find($kecamatanData->kabupaten_id);
        
                if (!$kabupatenData) {
                    // Log::error('Kabupaten not found for telepon ' . $telepon . ': ' . $kecamatanData->kabupaten_id);
                    return ['error' => 'Kabupaten not found'];
                }
        
                $provinsiData = provinsi::find($kabupatenData->provinsi_id);
        
                if (!$provinsiData) {
                    // Log::error('Provinsi not found for telepon ' . $telepon . ': ' . $kabupatenData->provinsi_id);
                    return ['error' => 'Provinsi not found'];
                }
        
                return [
                    'id' => $provinsiData->id,
                    'telepon' => $telepon,
                ];
        
            } catch (\Exception $e) {
                Log::error('An error occurred while processing telepon ' . $telepon . ': ' . $e->getMessage());
                return ['error' => 'An error occurred. Please try again.', 'message' => $e->getMessage()];
            }
        }
        
                /**
                 * Check users with the same provinsi_id as the given Akseptor's kelurahan_id.
                 *
                 * @param string $akseptorKelurahanId
                 * @return array
                 */
                private function getUsersByAkseptorKelurahan($akseptorKelurahanId)
                {
                    try {
                        // Find the Akseptor's kelurahan data
                        $kelurahanData = Kelurahan::find($akseptorKelurahanId);
        
                        if (!$kelurahanData) {
                            return ['error' => 'Kelurahan not found'];
                        }
        
                        // Retrieve kecamatan data
                        $kecamatanData = Kecamatan::find($kelurahanData->kecamatan_id);
        
                        if (!$kecamatanData) {
                            // Skip to the next iteration if kecamatan not found
                            return ['error' => 'Kecamatan not found'];
                        }
        
                        // Retrieve kabupaten data with latitude and longitude
                        $kabupatenData = Kabupaten::find($kecamatanData->kabupaten_id);
        
                        if (!$kabupatenData) {
                            // Skip to the next iteration if kabupaten not found
                            return ['error' => 'Kabupaten not found'];
                        }
        
                        $provinsiData = provinsi::find($kabupatenData->provinsi_id);
        
                        if (!$provinsiData) {
                            return ['error' => 'Provinsi not found'];
                        }
        
                        // Add the user location to the array
                        $userLocations[] = [
                            'id' => $provinsiData->id,
                        ];
        
                        Log::info("cek info Akseptor : " . json_encode($userLocations));
                        return ['provinsi_id' => $userLocations];
        
                    } catch (\Exception $e) {
                        return ['error' => 'An error occurred. Please try again.', 'message' => $e->getMessage()];
                    }
                }
        
        
        
             /**
             * Store a newly created resource in storage.
             *
             * @param  \Illuminate\Http\Request  $request
             */
<<<<<<< HEAD
                protected function updateDataAkse(Request $request, $id)
=======
            protected function updateDataAkse(Request $request, $id)
>>>>>>> origin/main
        {
            try {
                // Begin a database transaction
                DB::beginTransaction();
        
                // Find the Akseptor by ID
                $akseptor = akseptor_model::find($id);
        
                Log::info("cek data Akseptor lengkap : " . json_encode($akseptor));
        
                // Check if the Akseptor is found
                if (!$akseptor) {
                    return response()->json(['message' => 'Akseptor not found'], 404);
                }
                $golonganDarah=$akseptor->golongan_darah;
                Log::info("cek data Akseptor golongan : " . json_encode($golonganDarah));
        
              // Extracting relevant information from $akseptor
                $nama = $akseptor['nama'];
                $telepon = $akseptor['telepon'];
                $golonganDarah = $akseptor['golongan_darah'];
                $jumlahKantong = $akseptor['jumlah_kantong'];
                $tujuanPengajuan = $akseptor['tujuan_Pengajuan'];
        
                // Constructing the message
                $message  = "Hi, My Name Is $nama,\n\n";
                $message .= "We are in urgent need of blood donors.\n\n";
                $message .= "If you are available to donate, we would appreciate your help.\n\n";
                $message .= "Phone Number: $telepon\n";
                $message .= "Blood Type Needed: $golonganDarah\n";
                $message .= "Number of Blood Bags Needed: $jumlahKantong\n";
                $message .= "Reason for Application: $tujuanPengajuan\n\n";
                $message .= "Your generosity can save lives. Thank you for considering to donate!\n";
        
        
                // Retrieve golongan darah of the current Akseptor
                $golonganDarah = $akseptor->golongan_darah;
                Log::info("cek golongan darah akseptor : " . json_encode($golonganDarah));
        
               // Retrieve phone numbers with the same golongan darah
                $phoneNumbersByGolonganDarah = $this->getUserLocationsByGolonganDarah($golonganDarah);
                Log::info("cek user dengan golongan darah sama  : " . json_encode($phoneNumbersByGolonganDarah));
<<<<<<< HEAD
    
=======
        
                if (!$phoneNumbersByGolonganDarah) {
                    return response()->json(['message' => 'Golongan Darah Is Not Found']);
                }
>>>>>>> origin/main
        
                // Initialize an array to store the results
                $results = [];
                $akseptorKelurahan=$akseptor->kelurahan_id;
                Log::info("cek kelurahan id akseptor : " . json_encode($akseptorKelurahan));
                $akseptorID= $this->getUsersByAkseptorKelurahan($akseptorKelurahan);
                // Check if 'provinsi_id' key is present and non-empty
                Log::info("User Locations: " . json_encode($akseptorID));
        
        
                if (empty($akseptorID)) {
                    Log::error('No user locations found.');
                    return ['error' => 'No user locations found.'];
                }
        
                if (isset($akseptorID['provinsi_id']) && !empty($akseptorID['provinsi_id'])) {
                    // Extract the first element's 'id' field
                    $provinsiId = $akseptorID['provinsi_id'][0]['id'];
                
                    // Log the provinsi_id
                    Log::info("Provinsi ID: " . json_encode(['id' => $provinsiId]));
        
                } else {
                    // Log a message indicating that 'provinsi_id' is missing or empty
                    Log::info("Provinsi ID: " . json_encode(['message' => 'provinsi_id is missing or empty']));
                }
                Log::info("Provinsi ID: " . json_encode(['id' => $provinsiId]));
<<<<<<< HEAD

                if (!is_array($phoneNumbersByGolonganDarah)) {
                    Log::info("cek data golongan ternyata kosong: " . json_encode($phoneNumbersByGolonganDarah));
                    return response()->json(['message' => 'Golongan Darah Is Not Found or Telepon is Empty'], 404);
                }
    
=======
        
        
>>>>>>> origin/main
                foreach ($phoneNumbersByGolonganDarah as $userData) {
                    // Check if the telepon key is present in the $userData array
                    if (array_key_exists('telepon', $userData)) {
                        // Call the getAkeptorProvinsiByTelepon function for each telepon number
                        $result = $this->getAkeptorProvinsiByTelepon($userData['telepon']);
        
                        // Log the result data
                        Log::info('Result for telepon ' . $userData['telepon'] . ': ' . json_encode($result));
        
                        // Append the result to the $results array
                        $results[] = $result;
                    } else {
                        // Log a warning if the telepon key is missing
                        Log::warning('Telepon key is missing in userData: ' . json_encode($userData));
                    }
                }
                            // Initialize an array to store matching results
                    $matchingResults = [];
<<<<<<< HEAD
                    
                    Log::info("cek info result gess : " . json_encode($results));
                    Log::info("ini cek akseptor provinsi nya : " . json_encode($provinsiId));

=======
        
>>>>>>> origin/main
                    // Iterate through $results
                    foreach ($results as $result) {
                        // Check if the 'id' in $result matches $provinsiId
                        if (isset($result['id']) && $result['id'] == $provinsiId) {
                            // Append the matching result to $matchingResults
                            $matchingResults[] = $result;
                        }
                    }
<<<<<<< HEAD
                    
                    if (empty($matchingResults)) {
                    Log::info('Matching Results Not Found: ' . json_encode($matchingResults));
                    return response()->json(['error' => 'Not Found Provinsi Id'], 404);
                }
                        
                    // Log the matching results
=======
        
                    // Log the matching results
                    Log::info('Matching Results: ' . json_encode($matchingResults));
>>>>>>> origin/main
                                // Initialize an array to store matching telephone numbers
                    $matchingTelephones = [];
        
                    // Iterate through $matchingResults
                    foreach ($matchingResults as $matchingResult) {
                        // Check if the 'telepon' key exists in $matchingResult
                        if (isset($matchingResult['telepon'])) {
                            // Append the telephone number to $matchingTelephones
                            $matchingTelephones[] = $matchingResult['telepon'];
                        }
                    }
        
                // Log the matching telephone numbers
                Log::info('Matching Telephones: ' . json_encode($matchingTelephones));
        
                DB::commit();
                $this->sendMessage($matchingTelephones,$message);
        
                // Log the successful update
                Log::info('Akseptor has been updated', [ 'results' => $results]);
        
                // Return a JSON response with success message and updated data
                return response()->json(['message' => 'Akseptor data has been updated', 'data' => $results], 200);
            } catch (\Exception $e) {
                // Rollback the database transaction in case of an error
                DB::rollback();
        
                // Log the error
                Log::error("Error updating Akseptor: " . $e->getMessage());
        
                // Return a JSON response with error message and details
                return response()->json(['message' => 'Failed to update Akseptor data. Please try again.', 'error' => $e->getMessage()], 500);
            }
        }
        
        
        
        private function getUserLocationsByGolonganDarah($golonganDarah)
        {
            try {
                $usersWithMatchingBloodGroup = profileModel::where('golongan_darah', $golonganDarah)->get();
                $userData = [];
        
                foreach ($usersWithMatchingBloodGroup as $user) {
                    if (!empty($user->telepon)) {
                        $userData[] = [
                            'telepon' => $user->telepon,
                        ];
                    }
                }
                if (empty($userData)) {
                    return response()->json(['error' => 'No matching phone numbers found for the specified blood type.'], 404);
                }
        
                return $userData;
        
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Internal Server Error'], 500);
            }
        }
        
        private function sendMessage($phoneNumbers, $msgAkseptor) {
            $fonteeApiToken = env('FONNTE_API_TOKEN');
            $client = new Client();
        
            if (empty($fonteeApiToken)) {
                return response()->json(['error' => 'Invalid API token'], 401);
            }
        
            // Define the message and target phone number
            $message = "Hello Everyone \n\n$msgAkseptor"; // Corrected message string
            $target = implode(',', $phoneNumbers);
        
            try {
                $response = $client->post(env("FONNTE_API_LINK"), [
                    'headers' => [
                        'Authorization' => $fonteeApiToken,
                    ],
                    'json' => [
                        'message' => $message,
                        'target' => $target,
                    ],
                ]);
        
                // Log the request and complete response for debugging
                Log::info('Fontee API Request:', [
                    'url' => env("FONNTE_API_LINK"),
                    'headers' => [
                        'Authorization' => $fonteeApiToken,
                    ],
                    'body' => [
                        'message' => $message,
                        'target' => $target,
                    ],
                ]);
                Log::info('Fontee API Response:', json_decode($response->getBody(), true)); // Log complete response
        
                // Handle the response from Fontee API
                $body = $response->getBody();
                $result = json_decode($body);
        
                if ($result->status === true) {
                    // Pengiriman berhasil
                    return ['status' => 'success'];
                } else {
                    // Pengiriman gagal, kirim respons JSON error dengan alasan yang diberikan oleh layanan WhatsApp
                    return ['status' => 'error', 'reason' => $result->reason ?? 'Unknown error'];
                }
            } catch (\Exception $e) {
                // Tangani kesalahan yang mungkin terjadi selama pengiriman
                return ['status' => 'error', 'message' => $e->getMessage()];
            }
        }
        

    }

