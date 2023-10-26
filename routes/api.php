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
use App\Http\Controllers\Admin\PostController;

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
    //rediect to Home
    Route::get('/home/{id}', [HomeController::class, 'index'])->name('home');
    // Menambahkan rute untuk validateCheck\
    // Login Routes
    Route::get('/login', [LoginController::class, 'index'])->name('login');
    Route::post('/verify/login', [LoginController::class, 'login']);
    Route::post('/verify/otp/login', [LoginController::class, 'validateCheck']);
    // Logout Route
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


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


    Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {

        Route::get('/', [PostController::class, 'index'])->name('home.index');
        Route::get('/berita', [PostController::class, 'index'])->name('posts.index');
        Route::get('/berita/create', [PostController::class, 'create'])->name('posts.create');
        Route::post('/berita', [PostController::class, 'store'])->name('posts.store');
        Route::get('/berita/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
        Route::put('/berita/{post}', [PostController::class, 'update'])->name('posts.update');
        Route::delete('/berita/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    });

    Route::get('/get-session-data', [SessionController::class, 'getSessionData']);
    // CSRF Cookie
    Route::get('/sanctum/csrf-cookie', function (Request $request) {
        return response()->json(['message' => 'CSRF cookie set']);
    });
});
