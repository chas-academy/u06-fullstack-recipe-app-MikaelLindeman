<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserRecipeController;
use App\Http\Controllers\RecipeController;


Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('getuser/{id}', [AuthController::class, 'getUser']);
    
    // TODO: CRUD for recipe lists
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/recipes', [UserRecipeController::class, 'store']);
});
Route::post('/user/recipes', [RecipeController::class, 'saveRecipe'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->post('/recipes/save', [RecipeController::class, 'saveRecipe']);

Route::get('/my-recipes', [RecipeController::class, 'myRecipes'])->middleware('auth:sanctum');





