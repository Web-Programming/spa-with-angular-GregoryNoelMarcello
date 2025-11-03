import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv/cv.component';      // Impor Komponen CV
import { ContactComponent } from './contact/contact.component'; // Impor Komponen Kontak

const routes: Routes = [
  // Definisikan path untuk Halaman CV
  { path: 'cv', component: CvComponent },
  // Definisikan path untuk Halaman Kontak
  { path: 'contact', component: ContactComponent },
  // Redirect ke /cv jika tidak ada path yang cocok (halaman utama)
  { path: '', redirectTo: '/cv', pathMatch: 'full' },
  // Tambahkan path untuk halaman 404 (optional)
  // { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }