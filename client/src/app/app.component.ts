import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule // Import RouterModule here
  ]
})
export class AppComponent {
  title = 'BUY AND SELL WEBSITE';
}
