import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      newsletter: [false]
    });
  }

  submitContact(): void {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      console.log('Form is not valid');
      return;
    }

    const formData = this.contactForm.value;
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:3000/api/contact', formData)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage = 'Pesan Anda telah berhasil dikirim! Kami akan menghubungi Anda segera.';
          this.contactForm.reset();
          setTimeout(() => this.successMessage = '', 5000);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Contact submission failed', error);
          this.errorMessage = 'Gagal mengirim pesan. Silakan coba lagi.';
          setTimeout(() => this.errorMessage = '', 5000);
        }
      });
  }
}
