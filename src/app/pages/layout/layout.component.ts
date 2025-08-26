import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {SidebarComponent} from '../../share/sidebar.component';
import {HeaderComponent} from '../../share/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="flex h-screen">
      <app-sidebar class="w-64 flex-shrink-0"></app-sidebar>
      <div class="flex-1 flex flex-col">
        <app-header (logout)="logout()"></app-header>
        <main class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>

  `,
})
export class LayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
