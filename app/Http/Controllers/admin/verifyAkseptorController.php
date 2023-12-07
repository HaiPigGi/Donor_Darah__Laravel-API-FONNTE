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

        // Tambahkan parameter $id pada fungsi getUserProvinsi
    public function getUserProvinsi($id)
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

                $provinsiData = provinsi::find($kabupatenData->provinsi_id);

                if (!$provinsiData) {
                    continue;
                }

                // Add the user location to the array
                $userLocations[] = [
                    'id' => $provinsiData->id,
                ];
            }

            return response()->json(['provinsi_id' => $userLocations]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred. Please try again.'], 500);
        }
    }

    public function getAkeptorProvinsi ($id) {
        try {
            // Retrieve all profiles
            $akseptor = akseptor_model::all();
            Log::info("cek akseptor : ".json_encode($akseptor));

            // Initialize an empty array to store user locations
            $userLocations = [];

            foreach ($akseptor as $akseptor) {
                // Retrieve kelurahan data
                $kelurahanData = Kelurahan::find($akseptor->kelurahan_id);

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

                $provinsiData = provinsi::find($kabupatenData->provinsi_id);

                if (!$provinsiData) {
                    continue;
                }

                // Add the user location to the array
                $userLocations[] = [
                    'id' => $provinsiData->id,
                ];
            }


            return response()->json(['provinsi_id' => $userLocations]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred. Please try again.'], 500);
            
        }
    }
    public function getAkeptorProvinsiByTelepon($telepon)
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

        // // Log additional information
        // Log::info('Akseptor found for telepon ' . $telepon . ': ' . json_encode($akseptor));
        // Log::info('Kelurahan Data: ' . json_encode($kelurahanData));
        // Log::info('Kecamatan Data: ' . json_encode($kecamatanData));

        // Return provinsi_id, telepon, and additional data if needed
        return [
            'provinsi_id' => $provinsiData->id,
            'telepon' => $telepon,
            // Add more fields if needed
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
protected function getUsersByAkseptorKelurahan($akseptorKelurahanId)
{
    try {
        // Find the Akseptor's kelurahan data
        $kelurahanData = Kelurahan::find($akseptorKelurahanId);

        if (!$kelurahanData) {
            return ['error' => 'Kelurahan not found'];
        }

        // Initialize an empty array to store user locations
        $userLocations = [];

        foreach ($kelurahanData as $akseptor) {

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

            $provinsiData = provinsi::find($kabupatenData->provinsi_id);

            if (!$provinsiData) {
                continue;
            }

            // Add the user location to the array
            $userLocations[] = [
                'id' => $provinsiData->id,
            ];
        }

        Log::info("cek info Akseptor : ".json_encode($userLocations));
        return response()->json(['provinsi_id' => $userLocations]);


    } catch (\Exception $e) {
        return ['error' => 'An error occurred. Please try again.', 'message' => $e->getMessage()];
    }
}




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function updateDataAkse(Request $request, $id)
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

            // Add a field for the message
            $message = $request->input('message');

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
            $akseptorKelurahan = $akseptor->kelurahan_id;
            Log::info("cek kelurahan id akseptor : " . json_encode($akseptorKelurahan));

            // Get users based on Akseptor's kelurahan
            $usersByAkseptorKelurahan = $this->getUsersByAkseptorKelurahan($akseptorKelurahan);

            // Check if $usersByAkseptorKelurahan is an array
            if (!is_array($usersByAkseptorKelurahan)) {
                Log::error('$usersByAkseptorKelurahan is not an array.');
                // Handle the error or return an appropriate response
            } else {
                // Initialize an array to store matching telepons
                $matchingTelepons = [];

                // Loop through the phone numbers
                foreach ($phoneNumbersByGolonganDarah as $userData) {
                    // Check if $userData is an array
                    if (!is_array($userData)) {
                        Log::warning('$userData is not an array: ' . json_encode($userData));
                        // Skip to the next iteration or handle it accordingly
                        continue;
                    }

                    // Check if the telepon key is present in the $userData array
                    if (array_key_exists('telepon', $userData)) {
                        // Call the getAkeptorProvinsiByTelepon function for each telepon number
                        $result = $this->getAkeptorProvinsiByTelepon($userData['telepon']);

                        // Log the result data
                        Log::info('Result for telepon ' . $userData['telepon'] . ': ' . json_encode($result));

                        // Append the result to the $results array
                        $results[] = $result;

                        // Check if 'provinsi_id' exists in the result
                        if (isset($result['provinsi_id'])) {
                            // Check if 'provinsi_id' from result exists in usersByAkseptorKelurahan
                            $matchingUser = array_filter($usersByAkseptorKelurahan, function ($user) use ($result) {
                                return $user['provinsi_id'] == $result['provinsi_id'];
                            });

                            // If there is a match, add the telepon number to matchingTelepons
                            if (!empty($matchingUser)) {
                                $matchingTelepons[] = $userData['telepon'];

                                // You can send a message to the matching telepon number here
                                $this->sendMessage($userData['telepon'], $message);
                            }
                        } else {
                            // Log a warning if 'provinsi_id' is missing in result
                            Log::warning('Provinsi ID is missing in result: ' . json_encode($result));
                        }
                    } else {
                        // Log a warning if the telepon key is missing
                        Log::warning('Telepon key is missing in userData: ' . json_encode($userData));
                    }
                }
            }

            // Commit the database transaction
            DB::commit();

            // Log the successful update
            Log::info('Akseptor has been updated', ['akseptor' => $akseptor, 'matchingTelepons' => $matchingTelepons]);

            // Return a JSON response with success message and updated data
            return response()->json(['message' => 'Akseptor data has been updated', 'data' => $matchingTelepons], 200);
        } catch (\Exception $e) {
            // Rollback the database transaction in case of an error
            DB::rollback();

            // Log the error
            Log::error("Error updating Akseptor: " . $e->getMessage());

            // Return a JSON response with error message and details
            return response()->json(['message' => 'Failed to update Akseptor data. Please try again.', 'error' => $e->getMessage()], 500);
        }
    }


protected function getUserLocationsByGolonganDarah($golonganDarah)
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

    public function sendMessage($phoneNumber, $msgAkseptor) {
        $fonteeApiToken = env('FONNTE_API_TOKEN');
        $client = new Client();

        if (empty($fonteeApiToken)) {
            return response()->json(['error' => 'Invalid API token'], 401);
        }

        // Define the message and target phone number
        $message = "Your verification code: $msgAkseptor"; // Corrected message string
        $target = $phoneNumber;

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
