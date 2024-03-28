<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserRecipeController;


Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

// If logged in...
Route::group(['middleware' => 'auth:sanctum'], function() {
    // Logout user
    Route::post('logout', [AuthController::class, 'logout']);
    // Get specific user details
    Route::get('getuser/{id}', [AuthController::class, 'getUser']);
    
    // TODO: CRUD for recipe lists
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/recipes', [UserRecipeController::class, 'store']);
});


