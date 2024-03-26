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

    this.http.post(`${environment.api_url}/auth/login`, formData).subscribe(
      (response) => console.log(response),

      (error) => console.log(error)
    );
    this.router.navigate(['/home']);
  }
}
