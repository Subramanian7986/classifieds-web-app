import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SellProductComponent {
  productName: string = '';
  productDescription: string = '';
  price: number = 0;
  productImage: File | null = null; // To store the selected image file
  sellerId: string = ''; // Ensure this is set correctly

  constructor(private http: HttpClient, private router: Router) {
    // Example to get the sellerId from session storage
    this.sellerId = sessionStorage.getItem('userId') || ''; // Replace with your actual logic
  }

  // Handle file input change and store the selected file
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productImage = file;
    }
  }

  // Handle form submission
  onSubmit() {
    if (this.productImage && this.productName && this.productDescription && this.price && this.sellerId) {
      const formData = new FormData();
      formData.append('productName', this.productName);
      formData.append('productDescription', this.productDescription);
      formData.append('price', this.price.toString());
      formData.append('productImage', this.productImage);
      formData.append('sellerId', this.sellerId); // Include seller ID

      this.http.post('http://localhost:3000/api/products/sell', formData)
        .subscribe({
          next: (response) => {
            console.log('Product uploaded successfully:', response);
            this.goHome();
          },
          error: (error) => {
            console.error('Error uploading product:', error);
          }
        });
    } else {
      console.error('Please fill out all fields and select an image for the product.');
    }
  }

  // Navigate back to home
  goHome() {
    this.router.navigate(['/home']);
  }
}
