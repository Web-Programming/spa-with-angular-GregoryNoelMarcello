import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  // ← Pastikan ada
import { Housing } from './housing.model';

@Component({
  selector: 'app-lokasi-perumahan',
  standalone: true,
  imports: [CommonModule, RouterLink],  // ← RouterLink di imports
  templateUrl: './lokasi-perumahan.html',
  styleUrl: './lokasi-perumahan.css'
})
export class LokasiPerumahan {
  @Input() housing!: Housing;

  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }
}