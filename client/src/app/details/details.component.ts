import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DetailsComponent implements OnInit {
  username: string = '';
  userId: string = '';
  sellingProducts: any[] = [];
  boughtProducts: any[] = [];
  soldProducts: any[] = [];

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router  // Inject the Router service here to navigate to other pages
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId') || '';
    this.username = sessionStorage.getItem('username') || 'Guest';

    if (this.userId) {
      this.fetchUserDetails(this.userId);
    } else {
      console.error('User ID is missing from sessionStorage.');
    }
  }

  fetchUserDetails(userId: string): void {
    this.productService.getUserDetails(userId).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.sellingProducts = response.sellingProducts || [];
        this.boughtProducts = response.boughtProducts || [];
        this.soldProducts = response.soldProducts || [];
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }
  goHome(): void {
    this.router.navigate(['/home']);  // Navigate to the home page
  }
}
