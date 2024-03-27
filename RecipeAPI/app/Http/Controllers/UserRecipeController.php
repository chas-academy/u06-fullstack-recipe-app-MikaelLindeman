<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserRecipe;
use Illuminate\Support\Facades\Auth;

class UserRecipeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_id' => 'required',
            'label' => 'required',
        ]);

        $recipe = new UserRecipe;
        $recipe->user_id = Auth::id();
        $recipe->recipe_id = $validated['recipe_id'];
        $recipe->label = $validated['label'];
        $recipe->save();

        return response()->json(['message' => 'Recipe added successfully', 'recipe' => $recipe]);
    }
}
