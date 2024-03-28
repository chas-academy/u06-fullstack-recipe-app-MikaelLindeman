import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  passwordConfirmation: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);

    this.http.post(`${environment.api_url}/auth/register`, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
