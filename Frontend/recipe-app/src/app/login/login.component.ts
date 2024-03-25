import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
// Import AuthService and other necessary imports...
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          console.log('Login successful');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
  }
}
