// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class RecipeService {
//   constructor(private http: HttpClient) {}

//   private selectedRecipe: any;

//   setSelectedRecipe(recipe: any) {
//     this.selectedRecipe = recipe;
//   }

//   getSelectedRecipe(): any {
//     return this.selectedRecipe;
//   }

//   getRecipeById(id: string): Observable<any> {
//     const url = `https://api.edamam.com/api/recipes/v2/${id}`;
//     return this.http.get(url);
//   }
//   saveRecipe(recipeId: string, label: string): Observable<any> {
//     const url = `${environment.api_url}/my-recipes`;
//     return this.http.post(
//       url,
//       { recipe_id: recipeId, label },
//       { withCredentials: true }
//     );
//   }

//   getMyRecipes(): Observable<any> {
//     return this.http.get('/api/my-recipes', { withCredentials: true });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:8000/api'; // Adjust this URL to your Laravel API's base URL

  constructor(private http: HttpClient) {}

  saveRecipe(recipeId: string, label: string): Observable<any> {
    const url = `${this.baseUrl}/user/recipes`;
    const body = { recipe_id: recipeId, label: label };
    return this.http.post(url, body, { withCredentials: true });
  }
}
