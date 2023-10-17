<?php

namespace App\Http\Controllers\maps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kabupaten;

class KabupatenController extends Controller
{
    public function getKabupatenData($id)
{
    // Mendapatkan data kabupaten berdasarkan ID kabupaten atau ID provinsi
    $kabupatenData = Kabupaten::where('id', $id)
                               ->orWhere('provinsi_id', $id)
                               ->get();

    if ($kabupatenData->isEmpty()) {
        return response()->json(['error' => 'Kabupaten not found'], 404);
    }

    return response()->json(['kabupaten' => $kabupatenData]);
}

}
