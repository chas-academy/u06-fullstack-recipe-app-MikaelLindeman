<?php

namespace App\Http\Controllers;
use App\Models\Recipe;
use App\Models\UserRecipe;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function saveRecipe(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required|string',
            'label' => 'required|string',
        ]);

        // Create a new UserRecipe entry for the currently authenticated user
        Auth::user()->userRecipes()->create([
            'recipe_id' => $request->recipe_id,
            'label' => $request->label,
        ]);

        return response()->json(['message' => 'Recipe saved successfully.']);
    }

public function myRecipes(Request $request)
{
    $user = Auth::user(); 
    $recipes = $user->recipes()->get(['label', 'recipe_id'])->toArray(); 

    return response()->json(['recipes' => $recipes]);
}


}
