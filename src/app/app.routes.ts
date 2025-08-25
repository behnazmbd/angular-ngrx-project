import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import {LayoutComponent} from './pages/layout/layout.component';
import {roleGuard} from './guards/role.guard';
import {UsersComponent} from './pages/user/users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard],
      },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

