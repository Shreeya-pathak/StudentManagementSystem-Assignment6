import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Students } from './students/students';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'students', component: Students },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
