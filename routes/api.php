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
use App\Http\Controllers\tagar\TagarController;
use App\Http\Controllers\Forum\ChatMessageSend;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\admin\userAdminController;
use App\Http\Controllers\admin\beritaController;
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
        // Registrasi
        Route::get('/register/auth', [RegisterController::class, 'index']);
        Route::post('/register/auth', [RegisterController::class, 'verify']);
        Route::get('/register/auth/verify', [VerificationController::class, 'index']);
        Route::post('/register/auth/verify', [RegisterController::class, 'validateCheck']);
        Route::post('/register/auth/create', [RegisterController::class, 'verifyCreateUser']);
        Route::post('/check-number/telepon', [UserController::class, 'checkNumber']);
        // Login Routes
        Route::get('/login', [LoginController::class, 'index'])->name('login');
        Route::post('/verify/login', [LoginController::class, 'login']);
        Route::post('/verify/otp/login', [LoginController::class, 'validateCheck']);
        //Logout
        Route::middleware(['jwt'])->group(function() {
            Route::delete('/logout', [LoginController::class, 'logout']);
        });
        //user profiles
        Route::prefix('users')->middleware(['jwt'])->group(function () {
            Route::get('/getUser', [UserController::class, 'getUserDetails']);
            Route::put('/getUser/{userId}', [UserController::class, 'updateUser']);
        });
        //get All POST Without Auth
        Route::get('/posts/all-data', [beritaController::class, 'getAllDataStore']);

        // Routes for Admin
        Route::prefix('admin')->middleware(['jwt'])->group(function () {
            Route::get('/posts/all-data', [beritaController::class, 'getAllDataStore']);
            Route::get('/posts/all-data/{id}', [beritaController::class, 'getAllDataStoreByID']);
            Route::get('/getAkseptor/{id}', [verifyAkseptorController::class, 'getAkseptorByID']);
            Route::post('/posts', [beritaController::class, 'store']);
            Route::post('/posts/{post}', [beritaController::class, 'update']);
            Route::delete('/posts/{post}', [beritaController::class, 'destroy']);
            // Route for updating Akseptor data
            Route::get('/verify_akseptor', [verifyAkseptorController::class, 'showDataAkseptor']);
            Route::put('/verify_akseptor/{id}', [verifyAkseptorController::class, 'updateDataAkse']);
            Route::get('/verify_akseptor/{id}/edit', [verifyAkseptorController::class, 'editDataAkse']);
            Route::get('/getUserByGolongan/{golonganDarah}', [verifyAkseptorController::class, 'getUserLocationsByGolonganDarah']);
        });

        //for akseptor
        Route::post('/form/akseptor-send',[Akseptor::class,'validateData']);

        // Data Provinsi, Kabupaten, Kecamatan, Kelurahan
        Route::get('/get/provinsi', [ProvinsiController::class, 'getProvinsiData'])->name('provinsi');
        Route::get('/get/kabupaten/{id}', [kabupatenController::class, 'getKabupatenData'])->name('kabupaten');
        Route::get('/get/kecamatan/{id}', [kecamatanController::class, 'getKecamatanData'])->name('kecamatan');
        Route::get('/get/kelurahan/{id}', [kelurahanController::class, 'getKelurahanData'])->name('kelurahan');
        Route::get('/user/map',[UserController::class,'getUserLocation']);

        Route::get('/get-session-data', [SessionController::class, 'getSessionData']);
        // CSRF Cookie
        Route::get('/sanctum/csrf-cookie', function (Request $request) {
            return response()->json(['message' => 'CSRF cookie set']);
        });

        Route::post('/tagars', [TagarController::class, 'store'])->middleware('auth');
        Route::post('/tagars/{tagarId}/choose', [TagarController::class, 'chooseTagar']);
        //its for sendMessage
        Route::post('/send-message/{tagarId}/{userId}', [ChatMessageSend::class, 'sendMessage']);

        Route::post('/tagars/{tagarId}/user-messages/associate', [ChatMessageSend::class, 'associateMessageWithTagar']);

        // Get messages associated with a tagar
        Route::get('/tagars/{tagarId}/messages', [ChatMessageSend::class, 'getMessagesForTagar']);

        Route::get('/tagars/messages', [ChatMessageSend::class,'getAllMessagesFromTagar']);

    

        Route::get('/admin/getUser',[userAdminController::class,'getAllUser']);


});
