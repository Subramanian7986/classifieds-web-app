import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Import the routes directly
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide the router with routes
    provideHttpClient(),    // Provide HttpClient
    provideAnimations(),    // Provide Angular animations if used
  ],
})
.catch(err => console.error(err));
