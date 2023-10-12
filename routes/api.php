<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\maps\ProvinsiController;
use App\Http\Controllers\maps\kecamatanController;
use App\Http\Controllers\maps\kelurahanController;
use App\Http\Controllers\maps\kabupatenController;
use App\Http\Controllers\SessionController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Login Routes
Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Tambahkan route untuk menampilkan form registrasi dengan middleware CORS
Route::middleware(['cors', 'web'])->group(function () {
    // Registrasi
    Route::get('/register/auth', [RegisterController::class, 'index'])->name('register');
    Route::post('/register/auth', [RegisterController::class, 'verify'])->name('register.verify');
    Route::get('/register/auth/verify', [VerificationController::class, 'index'])->name('verify');
    Route::post('/register/auth/verify', [RegisterController::class, 'validateCheck'])->name('verification.verify');

    // Data Provinsi, Kabupaten, Kecamatan, Kelurahan
    Route::get('/get/provinsi', [ProvinsiController::class, 'getProvinsiData'])->name('provinsi');
    Route::get('/get/kabupaten/{id}', [kabupatenController::class, 'getKabupatenData'])->name('kabupaten');
    Route::get('/get/kecamatan/{id}', [kecamatanController::class, 'getKecamatanData'])->name('kecamatan');
    Route::get('/get/kelurahan/{id}', [kelurahanController::class, 'getKelurahanData'])->name('kelurahan');

    Route::get('/get-session-data', [SessionController::class, 'getSessionData']);
    // CSRF Cookie
    Route::get('/sanctum/csrf-cookie', function (Request $request) {
        return response()->json(['message' => 'CSRF cookie set']);
    });
});

