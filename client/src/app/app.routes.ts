import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SellProductComponent } from './sell-product/sell-product.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component'; // Import DetailsComponent
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sell', component: SellProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'details', component: DetailsComponent }, // Add DetailsComponent route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Define other routes
];


