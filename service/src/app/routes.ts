import { HomePageComponent } from './views/home-page';
import { LoginPageComponent } from './views/login-page';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'sign-in', component: LoginPageComponent },
  { path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
