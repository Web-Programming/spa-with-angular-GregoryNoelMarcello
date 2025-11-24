import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  submitRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = this.registerForm.value;
      this.http.post('http://localhost:3000/api/register', formData)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.successMessage = 'Registrasi berhasil. Silakan cek email Anda untuk verifikasi.';
            this.errorMessage = null;
            console.log('Registration successful', response);
            // Optional: reset the form or redirect to login
            this.registerForm.reset();
            // Clear success message after 5 seconds
            setTimeout(() => this.successMessage = null, 5000);
          },
          error: (error) => {
            this.isLoading = false;
            this.successMessage = null;
            const msg = error?.error?.message || error?.message || 'Registrasi gagal. Silakan coba lagi.';
            this.errorMessage = msg;
            console.error('Registration failed', error);
            // Clear error message after 7 seconds
            setTimeout(() => this.errorMessage = null, 7000);
          }
        });
    } else {
      console.log('Form is not valid');
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
}

