<?php

namespace App\Http\Controllers\maps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\provinsiModel; // Correct namespace with capital 'P'
class ProvinsiController extends Controller
{
    public function getProvinsiData()
    {
        $provinsiData = provinsiModel::all();
        return response()->json(['provinsi' => $provinsiData]);
    }
}
