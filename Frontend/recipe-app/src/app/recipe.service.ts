import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  private selectedRecipe: any;

  setSelectedRecipe(recipe: any) {
    this.selectedRecipe = recipe;
  }

  getSelectedRecipe(): any {
    return this.selectedRecipe;
  }

  getRecipeById(id: string): Observable<any> {
    const url = `https://api.edamam.com/api/recipes/v2/${id}`;
    return this.http.get(url);
  }
}
