<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FonnteController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\User\AvatarController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\Auth\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/fonntee', [FonnteController::class, 'index'])->name('fonntee');
Route::post('/fonntee', [FonnteController::class, 'sendFonnteMessage'])->name('fonntee');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Rute untuk menampilkan halaman edit profil
Route::get('/profile/edit', [AvatarController::class,'edit'])->name('profile.edit');

// Rute untuk mengupdate avatar pengguna
Route::match(['post', 'put'], '/profile/update-avatar', [AvatarController::class, 'updateAvatar'])->name('profile.update.avatar');

// Rute untuk menghapus avatar pengguna
Route::delete('/profile/delete-avatar', [AvatarController::class, 'deleteAvatar'])->name('profile.delete.avatar');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Login Routes
Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Tambahkan route untuk menampilkan form registrasi
Route::get('/register/auth', [App\Http\Controllers\Auth\RegisterController::class, 'index'])->name('register');
Route::post('/register/auth', [RegisterController::class, 'verify'])->name('register.verify');
Route::get('/register/auth/verify', [VerificationController::class, 'index'])->name('verify');
Route::post('/register/auth/verify', [RegisterController::class, 'validateCheck'])->name('verification.verify');

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {

    Route::get('/berita', [PostController::class, 'index'])->name('posts.index');
    Route::get('/berita/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/berita', [PostController::class, 'store'])->name('posts.store');
    Route::get('/berita/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/berita/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/berita/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

});
