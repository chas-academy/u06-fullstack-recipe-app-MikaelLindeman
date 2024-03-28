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
  searchRecipes(query: string, healthLabels: string[] = []): Observable<any> {
    let params = new HttpParams()
      .set('q', query)
      .set('app_id', this.appId)
      .set('app_key', this.appKey);

    // Append each health label as a separate 'health' parameter
    healthLabels.forEach((label) => {
      params = params.append('health', label);
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
