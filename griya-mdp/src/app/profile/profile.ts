import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from './components/profile-header/profile-header';
import { StatsCardComponent } from './components/stats-card/stats-card';
import { AboutCardComponent } from './components/about-card/about-card';
import { SocialCardComponent } from './components/social-card/social-card';
import { PropertyItemComponent } from './components/property-item/property-item';
import { FavoriteItemComponent } from './components/favorite-item/favorite-item';
import { HistoryItemComponent } from './components/history-item/history-item';
import { UserProfile, StatsSummary, PropertyItem, FavoriteItem, HistoryItem, SocialLinks } from './profile.models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    StatsCardComponent,
    AboutCardComponent,
    SocialCardComponent,
    PropertyItemComponent,
    FavoriteItemComponent,
    HistoryItemComponent
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class Profile {
  user: UserProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, ID',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff',
    isPremium: true,
    isVerified: true,
    memberSince: 'Jan 2021',
    bio: 'Passionate host and property manager.',
    job: 'Property Manager',
    birthdate: '1990-05-10',
    status: 'Active'
  };

  stats: StatsSummary = { properties: 3, favorites: 7, rating: 4.6, memberSince: 'Jan 2021' };

  properties: PropertyItem[] = [
    { id: 1, title: 'Cozy 2BR Apartment', location: 'Central Jakarta', price: 4500000, image: 'https://picsum.photos/seed/prop1/600/400', bedrooms: 2, bathrooms: 1, area: 45, status: 'Active' },
    { id: 2, title: 'Modern Studio', location: 'South Jakarta', price: 3000000, image: 'https://picsum.photos/seed/prop2/600/400', bedrooms: 1, bathrooms: 1, area: 28, status: 'Active' }
  ];

  favorites: FavoriteItem[] = [
    { id: 101, title: 'Seaside Villa', location: 'Bali', price: 15000000, image: 'https://picsum.photos/seed/fav1/600/400', rating: 4.9 }
  ];

  history: HistoryItem[] = [
    { title: 'Payment Received', description: 'Rp 5.000.000 from tenant', time: '2 hari yang lalu', badge: 'Rp 5.000.000', badgeColor: 'success', icon: 'bi-check-circle-fill', iconColor: 'success' },
    { title: 'Property Listed', description: 'Modern Studio listed', time: '1 minggu yang lalu', icon: 'bi-plus-circle', iconColor: 'primary' }
  ];

  socialLinks: SocialLinks = { facebook: 'https://facebook.com/example', instagram: 'https://instagram.com/example' };

  onEditProfile() { console.log('Edit profile clicked'); }
  onSettings() { console.log('Settings clicked'); }

  onEditProperty(id: number) { console.log('Edit property', id); }
  onDeleteProperty(id: number) { this.properties = this.properties.filter(p => p.id !== id); }
}
