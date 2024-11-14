import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../app.config';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule,RouterModule, FormsModule,HttpClientModule]
})
export class RegisterComponent {
  username: string = '';  // Add this line
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }

    const registerData = { username: this.username, email: this.email, password: this.password };

    this.http.post(`${environment.apiUrl}/users/register`, registerData).subscribe(
      (response: any) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
        this.message = 'Registration failed. Please try again.';
      }
    );
  }
}
