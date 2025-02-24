<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('user',[ UserController::class, 'index']);
// Route::get('user/{id}',[ UserController::class, 'show']);
// Route::post('user',[ UserController::class, 'store']);
// Route::put('user/{id}',[ UserController::class, 'update']);
// Route::delete('user/{id}',[ UserController::class, 'destroy']);

Route::apiResource('user', UserController::class);



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Proteksi route dengan middleware auth:sanctum (harus pakai token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
});

