import { Routes } from '@angular/router';
import { Home as HomeComponent } from './home/home';
import { Profile } from './profile/profile';
import { Login } from './login/login';
import { Register } from './register/register';
import { Contact } from './contact/contact';
import { Detail } from './detail/detail';  // ← Import Detail Component

export const routes: Routes = [
    {
        path : "",
        component : HomeComponent,
        title : 'Home Page'
    },
    {
        path : "profile",
        component : Profile,
    },
    {
        path : "login",
        component : Login,
    },
    {
        path : "register",
        component : Register,
    },
    {
        path : "contact",
        component : Contact,
    },
    {
        path: "property/:id",           // ← Route dengan parameter
        component: Detail,
        title: 'Detail Property - Griya MDP'
    },
    {
        path: "**",                      // ← Wildcard untuk 404
        redirectTo: "",
        pathMatch: 'full'
    }
];