import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <h1 class="text-xl font-bold text-black dark:text-white">Admin Dashboard</h1>
      <div class="flex items-center gap-4">
        <button (click)="toggleDark()" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">🌓</button>
        <button (click)="logout.emit()" class="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Output() logout = new EventEmitter<void>();

  toggleDark() {
    document.documentElement.classList.toggle('dark');
  }
}
