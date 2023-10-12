<?php

namespace App\Http\Controllers\maps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Provinsi; // Correct namespace with capital 'P'
class ProvinsiController extends Controller
{
    public function getProvinsiData()
    {
        $provinsiData = Provinsi::all();
        return response()->json(['provinsi' => $provinsiData]);
    }


}
