<?php

namespace App\Http\Controllers\maps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kelurahan;
use App\Models\Kecamatan;

class kelurahanController extends Controller
{
    public function getKelurahanData($id)
{
    // Mendapatkan data kelurahan berdasarkan ID kelurahan atau ID kecamatan
    $kelurahanData = Kelurahan::where('id', $id)
                              ->orWhere('kecamatan_id', $id)
                              ->get();

    if ($kelurahanData->isEmpty()) {
        return response()->json(['error' => 'Kelurahan not found'], 404);
    }

    return response()->json(['kelurahan' => $kelurahanData]);
}

}
