import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  // Import RouterModule directly
  template: `
    <nav>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'FlickFlow';
}
