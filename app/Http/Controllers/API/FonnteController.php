<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use GuzzleHttp\Client;
use App\Models\User;

class FonnteController extends Controller
{
    public function sendFonnteMessage(Request $request)
    {
        $apiToken = env('FONNTE_API_TOKEN');

        if (empty($apiToken)) {
            return response()->json(['error' => 'Invalid API token'], 401);
        }

        $validatedData = $request->validate([
            'golongan_darah' => 'required',
            'message' => 'required',
            'countryCode' => 'nullable',
        ]);

        $golonganDarah = $validatedData['golongan_darah'];
        $message = $validatedData['message'];

        $countryCode = isset($validatedData['countryCode']) ? $validatedData['countryCode'] : null;

        $headers = [
            'Authorization' => $apiToken,
        ];

        try {
            $usersWithMatchingBloodGroup = User::where('golongan_darah', $golonganDarah)->get();
            $phoneNumbers = [];

            foreach ($usersWithMatchingBloodGroup as $user) {
                if (!empty($user->telepon)) {
                    $phoneNumbers[] = $user->telepon;
                }
            }

            if (empty($phoneNumbers)) {
                return response()->json(['error' => 'No matching phone numbers found for the specified blood type.'], 400);
            }

            $data = [
                'message' => $message,
                'target' => implode(',', $phoneNumbers),
            ];

            if ($countryCode !== null) {
                $data['countryCode'] = $countryCode;
            }

            $client = app('fonnte');

            $response = $client->post('https://api.fonnte.com/send', [
                'headers' => $headers,
                'form_params' => $data,
            ]);

            $body = $response->getBody();
            $result = json_decode($body);

            if ($result->status === true) {
                return response()->json(['status' => 'success']);
            } else {
                return response()->json(['status' => 'error', 'reason' => $result->reason], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        return view('fonnte');
    }
}
