import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.http.post(`${environment.api_url}/auth/login`, formData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        // Assuming the response contains a token, adjust based on your actual API response
        localStorage.setItem('token', response.token); // Store the token
        this.router.navigate(['/home']); // Navigate to the home page
      },
      error: (error) => {
        console.log('Login failed', error);
      },
    });
  }
}
