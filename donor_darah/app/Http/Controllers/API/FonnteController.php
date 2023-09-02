<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config; // Import facade Config
use GuzzleHttp\Client;
use App\Models\User; // Pastikan Anda telah mengimpor model User
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
            'golongan_darah' => 'required', // Golongan darah harus diisi
            'message' => 'required', // Pesan harus diisi
            'countryCode' => 'nullable', // Kode negara bersifat opsional
        ]);

        // Ambil golongan darah dari input pengguna yang telah divalidasi
        $golonganDarah = $validatedData['golongan_darah'];
        $message = $validatedData['message'];

        // Periksa apakah 'countryCode' ada dalam data yang divalidasi
        $countryCode = isset($validatedData['countryCode']) ? $validatedData['countryCode'] : null;

        // Inisialisasi instance Guzzle HTTP Client
        $headers = [
            'Authorization' => $apiToken, // Use the 'Bearer' format for the token
        ];

        try {
            // Ambil semua pengguna (users) dengan golongan darah tertentu
            $usersWithMatchingBloodGroup = User::where('golongan_darah', $golonganDarah)->get();

            // Inisialisasi array untuk menyimpan nomor telepon yang sesuai
            $phoneNumbers = [];

            // Loop melalui pengguna yang sesuai dan tambahkan nomor telepon ke dalam array
            foreach ($usersWithMatchingBloodGroup as $user) {
                // Pastikan nomor telepon pengguna tidak kosong
                if (!empty($user->telepon)) {
                    $phoneNumbers[] = $user->telepon;
                }
            }

            // Jika tidak ada nomor telepon yang sesuai, kembalikan respons khusus
            if (empty($phoneNumbers)) {
                return response()->json(['error' => 'No matching phone numbers found for the specified blood type.'], 400);
            }

            // Data untuk dikirim ke API Fonnte
            $data = [
                'message' => $message,
                // Gunakan implode untuk menggabungkan nomor telepon yang sesuai menjadi satu string yang dipisahkan dengan koma
                'target' => implode(',', $phoneNumbers),
            ];

            // Add 'countryCode' to the data if it's provided
            if ($countryCode !== null) {
                $data['countryCode'] = $countryCode;
            }

            // Initialize the Guzzle HTTP Client
            $client = app('fonnte');

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
