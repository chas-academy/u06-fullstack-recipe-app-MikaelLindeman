import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EdamamService {
  private apiUrl = 'https://api.edamam.com/search';
  private appId = 'a70e13cc';
  private appKey = '6bc7956167e26b2efa8c5ccd8e78334c';

  constructor(private http: HttpClient) {}

  // searchRecipes(
  //   query: string,
  //   allergies: string[] = [],
  //   diets: string[] = []
  // ): Observable<any> {
  //   let params = new HttpParams()
  //     .set('q', query)
  //     .set('app_id', this.appId)
  //     .set('app_key', this.appKey);

  //   allergies.forEach((allergy) => {
  //     params = params.append('health', allergy.toLowerCase());
  //   });

  //   diets.forEach((diet) => {
  //     params = params.append('diet', diet.toLowerCase());
  //   });

  //   return this.http.get(`${this.apiUrl}`, { params });
  // }
  // Assuming `searchRecipes` uses a single array for both health labels and meal types
  // EdamamService

  // Update the method to include a third parameter for meal types
  searchRecipes(
    query: string,
    healthLabels: string[] = [],
    mealTypes: string[] = []
  ): Observable<any> {
    let params = new HttpParams()
      .set('q', query)
      .set('app_id', this.appId)
      .set('app_key', this.appKey);

    // Append health labels to the request
    healthLabels.forEach((label) => {
      params = params.append('health', label);
    });

    // Append meal types to the request, if your API supports it
    mealTypes.forEach((type) => {
      params = params.append('mealType', type); // Assuming 'mealType' is a supported parameter
    });

    return this.http.get(`${this.apiUrl}`, { params });
  }

  getRecipeDetails(id: string): Observable<any> {
    const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${this.appId}&app_key=${this.appKey}`;
    return this.http.get<any>(url);
  }
  searchRecipesWithFilters(
    query: string,
    healthLabels: string[]
  ): Observable<any> {
    let healthFilters = healthLabels
      .map((label) => `health=${label}`)
      .join('&');
    const url = `https://api.edamam.com/api/recipes/v2?app_id=${this.appId}&app_key=${this.appKey}&q=${query}&${healthFilters}`;

    return this.http.get(url);
  }
}
