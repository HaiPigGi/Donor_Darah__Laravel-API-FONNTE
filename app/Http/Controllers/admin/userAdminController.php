<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\profileModel;
class userAdminController extends Controller
{
    protected function getAllUser()
{
    $users = profileModel::all(['nama', 'telepon', 'ktp', 'pekerjaan', 'golongan_darah', 'kelurahan_id']);
    return response()->json($users);
}

}
