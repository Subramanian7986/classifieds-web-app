import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../app.config'; // Ensure this path points to your config file
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  username: string = '';
  selectedItem: any;
  showOrderForm: boolean = false;
  order = {
    address: '',
    email: '',
    phoneNumber: '',
    expectedPrice: 0
  };
  userId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch userId from sessionStorage
    this.userId = sessionStorage.getItem('userId');

    if (!this.userId) {
      alert('User ID is missing. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    // Fetch username from sessionStorage
    this.username = sessionStorage.getItem('username') || 'Guest';
    
    // Fetch products
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<any[]>(`${environment.apiUrl}/products/Selling`).subscribe(
      (data) => {
        console.log('Fetched products:', data); // Debugging line
        // Filter products that are available for selling
        this.products = data.filter(product => product.status === 'Selling');
        console.log('Filtered products:', this.products); // Debugging line
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  openOrderForm(item: any): void {
    this.selectedItem = item;
    this.showOrderForm = true;
    this.resetOrder();
  }
 
  placeOrder(): void {
    if (!this.userId) {
      alert('User ID is missing. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }
  
    // Check if the user is trying to buy their own product
    if (this.selectedItem.sellerId === this.userId) {
      alert('You cannot buy your own product.');
      this.closeOrderForm();
      this.fetchProducts();
      return;
    }
  
    const orderData = {
      productId: this.selectedItem._id, // Pass the product ID to be ordered
      userId: this.userId, // Pass the user ID as buyerId
      address: this.order.address,
      email: this.order.email,
      phoneNumber: this.order.phoneNumber,
      expectedPrice: this.order.expectedPrice
    };
  
    // Send order data to the server
    this.http.post(`${environment.apiUrl}/products/purchase`, orderData) // Updated endpoint for purchase
      .subscribe(
        (response) => {
          alert('Order placed successfully!');
          this.closeOrderForm();
          this.fetchProducts(); // Refresh the products list
        },
        (error) => {
          console.error('Error placing order:', error);
          alert('There was an issue placing the order.');
        }
      );
  }
    

  closeOrderForm(): void {
    this.selectedItem = null;
    this.showOrderForm = false;
  }

  resetOrder(): void {
    this.order = {
      address: '',
      email: '',
      phoneNumber: '',
      expectedPrice: 0
    };
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
