import {LoginComponent} from './pages/login/login.component';
import {Routes} from '@angular/router';
import {LayoutComponent} from './pages/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UsersComponent} from './pages/user/users.component';
import {AuthGuard} from './guards/auth.guard';
import {RoleGuard} from './guards/role.guard';



export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent, canActivate: [RoleGuard]}
    ]
  },
  { path: '**', redirectTo: '' }
];
