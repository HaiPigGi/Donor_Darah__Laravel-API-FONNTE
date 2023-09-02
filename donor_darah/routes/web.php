<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\FonnteController;
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

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
