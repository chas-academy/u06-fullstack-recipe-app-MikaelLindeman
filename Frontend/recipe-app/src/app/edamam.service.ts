import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EdamamService {
  private apiUrl = 'https://api.edamam.com/search';
  private appId = 'a70e13cc';
  private appKey = '6bc7956167e26b2efa8c5ccd8e78334c';

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<any> {
    const params = `?q=${query}&app_id=${this.appId}&app_key=${this.appKey}&from=0&to=10`;
    return this.http.get(`${this.apiUrl}${params}`);
  }
}
