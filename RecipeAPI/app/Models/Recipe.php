<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description']; 
    
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_recipes', 'recipe_id', 'user_id')
                    ->withPivot('label'); 
    }
}
