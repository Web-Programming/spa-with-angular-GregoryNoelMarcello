import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  // UI state
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  // Remember me (template-driven)
  rememberMe: boolean = false;
  // Forgot password
  showForgotPasswordModal: boolean = false;
  forgotPasswordEmail: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitLogin(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      console.log('Form is not valid');
      return;
    }

    const credentials = this.loginForm.value;
    const payload = { email: credentials.email, password: credentials.password };

    this.isLoading = true;
    this.errorMessage = '';

    this.http.post('http://localhost:3000/api/login', payload)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          const token = response?.token;
          const user = response?.user ?? null;

          if (token) {
            if (credentials.remember) {
              localStorage.setItem('token', token);
              if (user) localStorage.setItem('user', JSON.stringify(user));
            } else {
              sessionStorage.setItem('token', token);
              if (user) sessionStorage.setItem('user', JSON.stringify(user));
            }

            // Redirect to home/dashboard
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Login gagal: token tidak diterima';
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login failed', error);
          if (error?.status === 401) {
            this.errorMessage = 'Email atau password salah';
          } else if (error?.status === 403) {
            this.errorMessage = 'Akun Anda telah diblokir';
          } else {
            this.errorMessage = 'Terjadi kesalahan. Silakan coba lagi';
          }
        }
      });
  }

  openForgotPassword(): void {
    this.showForgotPasswordModal = true;
  }

  sendResetPasswordEmail(): void {
    this.http.post('/api/forgot-password', { email: this.forgotPasswordEmail })
      .subscribe({
        next: () => {
          alert('Email reset password telah dikirim');
          this.showForgotPasswordModal = false;
          this.forgotPasswordEmail = '';
        }
      });
  }
}
