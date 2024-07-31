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
  images = [
    {src: 'assets/images/image1.jpg', alt: 'Description of image 1', class: 'horizontal'},
    {src: 'assets/images/image2.jpg', alt: 'Description of image 2', class: 'horizontal'},
    {src: 'assets/images/image3.jpg', alt: 'Description of image 3', class: 'horizontal'},
  ];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      birthdate: ['', Validators.required],
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
