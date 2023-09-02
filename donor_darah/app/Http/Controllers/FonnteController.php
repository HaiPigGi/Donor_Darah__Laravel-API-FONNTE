<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config; // Import facade Config
use GuzzleHttp\Client;

class FonnteController extends Controller
{
    public function sendFonnteMessage(Request $request)
{
    // Validasi token API dari konfigurasi .env
    $apiToken = env('FONNTE_API_TOKEN');


    // Periksa apakah token API adalah valid
    if (empty($apiToken)) {
        return response()->json(['error' => 'Invalid API token'], 401); // Unauthorized
    }

    // Validasi data yang diterima dari pengguna (sesuaikan dengan kebutuhan Anda)
    $validatedData = $request->validate([
        'target' => 'required', // Nomor telepon harus diisi
        'message' => 'required', // Pesan harus diisi
        'countryCode' => 'nullable', // Kode negara bersifat opsional
    ]);

    // Ambil data dari input pengguna yang telah divalidasi
    $target = $validatedData['target'];
    $message = $validatedData['message'];

    // Periksa apakah 'countryCode' ada dalam data yang divalidasi
    $countryCode = isset($validatedData['countryCode']) ? $validatedData['countryCode'] : null;

    // Inisialisasi instance Guzzle HTTP Client
    $headers = [
        'Authorization' => $apiToken, // Use the 'Bearer' format for the token
    ];

    try {
        // Initialize the Guzzle HTTP Client
        $client = app('fonnte');

        // Data to be sent to the Fonnte API
        $data = [
            'target' => $target,
            'message' => $message,
        ];

        // Add 'countryCode' to the data if it's provided
        if ($countryCode !== null) {
            $data['countryCode'] = $countryCode;
        }

        // Send a POST request to the Fonnte API
        $response = $client->post('https://api.fonnte.com/send', [
            'headers' => $headers,
            'form_params' => $data,
        ]);

        // Get the response body and decode it from JSON
        $body = $response->getBody();
        $result = json_decode($body);

        // Check if the API call was successful and handle the response accordingly
        if ($result->status === true) {
            return response()->json($result);
        } else {
            return response()->json(['error' => $result->reason], 500);
        }
    } catch (\Exception $e) {
        // Handle any exceptions that may occur during the API call
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    public function index()
    {
        return view('fonnte');
    }
}
