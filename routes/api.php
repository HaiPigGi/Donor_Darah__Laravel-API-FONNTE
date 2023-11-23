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
use App\Http\Controllers\API\Akseptor;
use App\Http\Controllers\admin\verifyAkseptorController;

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

// Tambahkan route untuk menampilkan form registrasi dengan middleware CORS
Route::middleware(['cors', 'web'])->group(function () {
// Menambahkan rute untuk validateCheck\
    // Login Routes
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/verify/login', [LoginController::class, 'login']);
    Route::post('/verify/otp/login', [LoginController::class, 'validateCheck']);
    // Logout Route
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

    Route::post('/form/akseptor-send',[Akseptor::class,'validateData'])->name('index');

    // Registrasi
    Route::get('/register/auth', [RegisterController::class, 'index']);
    Route::post('/register/auth', [RegisterController::class, 'verify']);
    Route::get('/register/auth/verify', [VerificationController::class, 'index']);
    Route::post('/register/auth/verify', [RegisterController::class, 'validateCheck']);
    Route::post('/register/auth/create', [RegisterController::class, 'verifyCreateUser']);

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

    // Route for showing Akseptor data
    Route::get('/admin/akseptor', [verifyAkseptorController::class, 'showDataAkseptor']);
    // Route for updating Akseptor data
    Route::put('/admin/akseptor/{id}', [verifyAkseptorController::class, 'updateDataAkse']);
    Route::get('/admin/verify_akseptor', [verifyAkseptorController::class, 'showDataAkseptors'])->name('verify_akseptor');
    Route::put('/admin/verify_akseptor/{id}', [verifyAkseptorController::class, 'updateDataAkse'])->name('verify_akseptor.update');
    Route::get('/admin/verify_akseptor/{id}/edit', [verifyAkseptorController::class, 'editDataAkse'])->name('verify_akseptor.edit');
//     Route::middleware(['auth:sanctum', 'verified', 'admin'])->group(function () {

    
// });

});
