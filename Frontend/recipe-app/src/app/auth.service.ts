import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

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

  // Implement other methods such as logout, check authentication status, etc.
}
