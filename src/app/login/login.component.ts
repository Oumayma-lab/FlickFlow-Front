import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service'; // Adjust the path as necessary

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    this.userService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      response => {
        console.log('User signed in successfully', response);
        this.router.navigate(['/home']); // Redirect to /home after successful login
      },
      error => {
        console.error('Error signing in user', error);
        alert('Error signing in user: ' + error.error); // Show error message
      }
    );
  }
}
