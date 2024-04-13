<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserRecipeController;


Route::post('/api/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('getuser/{id}', [AuthController::class, 'getUser']);
    
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/recipes', [UserRecipeController::class, 'store']);
});


