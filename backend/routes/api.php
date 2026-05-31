<?php

use App\Http\Controllers\Api\LibraryApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider or the application bootstrap
| system which is configured to automatically prefix all of them with "/api".
|
*/

Route::get('/livres', [LibraryApiController::class, 'getLivres']);
Route::get('/emprunts', [LibraryApiController::class, 'getEmprunts']);
Route::post('/emprunts', [LibraryApiController::class, 'storeEmprunt']);
