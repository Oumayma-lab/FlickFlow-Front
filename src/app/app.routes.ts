import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HomeComponent} from "./home/home.component";
import {SearchComponent} from "./search/search.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent }, // Add route for HomeComponent
  { path: 'search', component: SearchComponent }, // Add route for HomeComponent
  { path: '', component: HomeComponent }, // Add route for HomeComponent
  // { path: '', redirectTo: '/login', pathMatch: 'full' } // Optional: Redirect to login as the default route
];
