import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api'; // Adjust this URL to your Laravel API

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/sanctum/csrf-cookie`)
      .pipe(
        switchMap(() => this.http.post(`${this.baseUrl}/login`, credentials))
      );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
  }

  addRecipeToUserList(recipe: any): Observable<any> {
    return this.http.post(
      `${environment.api_url}/user/recipes`,
      { recipe },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
