<?php

namespace App\Http\Controllers\maps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kecamatan;
class kecamatanController extends Controller
{
    public function getKecamatanData($id)
    {
        // Mendapatkan data kecamatan berdasarkan ID kecamatan atau ID kabupaten
        $kecamatanData = Kecamatan::where('id', $id)
                                   ->orWhere('kabupaten_id', $id)
                                   ->get();

        if ($kecamatanData->isEmpty()) {
            return response()->json(['error' => 'Kecamatan not found'], 404);
        }

        return response()->json(['kecamatan' => $kecamatanData]);
    }

}
