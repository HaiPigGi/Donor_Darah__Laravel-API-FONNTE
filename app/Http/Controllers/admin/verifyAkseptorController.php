<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\akseptor_model;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
class verifyAkseptorController extends Controller
{



    
    public function showDataA () {
        $akseptor = akseptor_model::all();
        return response()->json($akseptor);
    }
     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function updateDataAkse(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            // Find the Akseptor by ID
            $akseptor = akseptor_model::find($id);
            // Check if the Akseptor is found
            if (!$akseptor) {
                return response()->json(['message' => 'Akseptor not found'], 404);
            }
            // Get the phone number from the Akseptor
             $phoneNumber = $akseptor->telepon;
    
            // Update the Akseptor data
            $akseptor->update([
                'status' => 'verify', // Set the status to 'verify'
            ]);
    
            // Add a field for the message
            $message = $request->input('message');
    
            // Commit the database transaction
            DB::commit();
             // Send the verification message
            $this->sendMessage($phoneNumber, $message);
            Log::info('Akseptor has been updated', $akseptor);
    
            return response()->json(['message' => 'Akseptor data has been updated', 'data' => $akseptor]);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error("Error updating Akseptor: " . $e->getMessage());
            return response()->json(['message' => 'Failed to update Akseptor data. Please try again.', 'error' => $e->getMessage()], 500);
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
