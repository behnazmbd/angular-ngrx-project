import {Component, inject} from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 space-y-2">
      <div *ngFor="let toast of toasts$ | async"
           [ngClass]="{
           'bg-green-500': toast.type==='success',
           'bg-red-500': toast.type==='error',
           'bg-blue-500': toast.type==='info'
         }"
           class="text-white px-4 py-2 rounded shadow">
        {{ toast.message }}
      </div>
    </div>
  `
})
export class ToastComponent {
  toasts$ = inject(ToastService).toasts$;
}
