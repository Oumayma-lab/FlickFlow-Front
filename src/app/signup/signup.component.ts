import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";
import {UserDto} from "../models/UserDto";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      birthday: ['', Validators.required],
      subscriptionType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const user: UserDto = this.signupForm.value;
      console.log('Submitting user:', user); // Debug logging
      this.userService.register(user).subscribe(
        response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']); // Redirect to login page on successful registration
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    } else {
      console.log('Form is invalid'); // Debug logging
      // Highlight form controls with errors
      this.signupForm.markAllAsTouched();
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control ? control.hasError(errorName) && control.dirty : false;
  }
}
