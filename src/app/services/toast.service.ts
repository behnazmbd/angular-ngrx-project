import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts$ = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts$.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const current = this._toasts$.value;
    this._toasts$.next([...current, { message, type }]);
    setTimeout(() => this.remove(message), 3000);
  }

  remove(message: string) {
    this._toasts$.next(this._toasts$.value.filter(t => t.message !== message));
  }
}
