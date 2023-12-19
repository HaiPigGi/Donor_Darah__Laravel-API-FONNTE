<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\akseptor_model;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\profileModel;
use App\Models\Kelurahan;
use App\Models\Kecamatan;
use App\Models\Kabupaten;
use App\Models\provinsi;
class verifyAkseptorController extends Controller
{
    public function showDataAkseptor () {
        $akseptor = akseptor_model::all();
        return response()->json($akseptor);
    }
    protected function getAkseptorByID($id)
{
    try {
        $akseptor = akseptor_model::findOrFail($id);
        return response()->json($akseptor);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Akseptor not found.'], 404);
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


<<<<<<< HEAD
 /**
             * Update a newly Message for akseptor.
             *
             * @param  \Illuminate\Http\Request  $request
             */
                protected function updateDataAkse(Request $request, $id)
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

                if (!is_array($phoneNumbersByGolonganDarah)) {
                    Log::info("cek data golongan ternyata kosong: " . json_encode($phoneNumbersByGolonganDarah));
                    return response()->json(['message' => 'Golongan Darah Is Not Found or Telepon is Empty'], 404);
                }
    
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
                    
                    Log::info("cek info result gess : " . json_encode($results));
                    Log::info("ini cek akseptor provinsi nya : " . json_encode($provinsiId));

                    // Iterate through $results
                    foreach ($results as $result) {
                        // Check if the 'id' in $result matches $provinsiId
                        if (isset($result['id']) && $result['id'] == $provinsiId) {
                            // Append the matching result to $matchingResults
                            $matchingResults[] = $result;
                        }
                    }
                    
                    if (empty($matchingResults)) {
                    Log::info('Matching Results Not Found: ' . json_encode($matchingResults));
                    return response()->json(['error' => 'Not Found Provinsi Id'], 404);
                }
                        
                    // Log the matching results
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
                // Update status to "verifikasi" based on the ID
                $akseptor->status = 'verifikasi';
                $akseptor->save();
                
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
        
=======

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    protected function updateDataAkse(Request $request, $id)
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

        if (!$phoneNumbersByGolonganDarah) {
            return response()->json(['message' => 'Golongan Darah Is Not Found']);
        }

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

            // Iterate through $results
            foreach ($results as $result) {
                // Check if the 'id' in $result matches $provinsiId
                if (isset($result['id']) && $result['id'] == $provinsiId) {
                    // Append the matching result to $matchingResults
                    $matchingResults[] = $result;
                }
            }

            // Log the matching results
            Log::info('Matching Results: ' . json_encode($matchingResults));
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
>>>>>>> origin/main



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




    public function editDataAkse($id)
    {
        try {
            DB::beginTransaction();
    
            // Find the Akseptor by ID
            $selectedAkseptor = akseptor_model::find($id);
    
            // Check if the Akseptor is found
            if (!$selectedAkseptor) {
                return response()->json(['message' => 'Akseptor not found'], 404);
            }
            // Get all Akseptor data for display
            $allAkseptors = akseptor_model::all();
    
            // Commit the database transaction
            DB::commit();
    
            // You can return a view with the selected Akseptor data for editing
            return response()->json(['message'=>'Success To Update Data']);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error("Error editing Akseptor: " . $e->getMessage());
            return response()->json(['message' => 'Failed to edit Akseptor data. Please try again.', 'error' => $e->getMessage()], 500);
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
