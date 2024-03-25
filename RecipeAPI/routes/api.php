<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Login user
Route::post('login', [AuthController::class, 'login']);
// Register user
Route::post('register', [AuthController::class, 'register']);

// If logged in...
Route::group(['middleware' => 'auth:sanctum'], function() {
    // Logout user
    Route::post('logout', [AuthController::class, 'logout']);
    // Get specific user details
    Route::get('getuser/{id}', [AuthController::class, 'getUser']);
    
    // TODO: CRUD for recipe lists
});

Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return response()->json(['message' => 'Logged in successfully']);
    }

    return response()->json(['error' => 'The provided credentials do not match our records.'], 401);
});
