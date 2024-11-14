import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../app.config';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = { email: this.email, password: this.password };

    this.http.post(`${environment.apiUrl}/users/login`, loginData).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        sessionStorage.setItem('username', response.username); // Ensure 'username' is in the response
        sessionStorage.setItem('userId', response.userId); // Ensure 'userId' is in the response
        sessionStorage.setItem('token', response.token); // Ensure token is included in response
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
        this.message = 'Invalid credentials. Please try again.';
      }
    );
  }
}
