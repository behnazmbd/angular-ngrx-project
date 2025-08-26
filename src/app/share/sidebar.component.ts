import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="flex flex-col p-4 space-y-4 h-screen bg-gray-800 text-white">
      <a routerLink="/dashboard" routerLinkActive="bg-gray-700" class="block p-2 rounded text-white">
        Dashboard
      </a>

      <div class="mt-auto">
        <a routerLink="/users" routerLinkActive="bg-gray-700" class="block p-2 rounded text-white">
          Users
        </a>
      </div>
    </nav>
  `
})
export class SidebarComponent {}
