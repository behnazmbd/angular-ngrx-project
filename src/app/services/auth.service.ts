import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  private role$ = new BehaviorSubject<string | null>(this.getRole());

  private hasToken(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }

  private getRole(): string | null {
    return localStorage.getItem('role');
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('role', 'admin');
      this.loggedIn$.next(true);
      this.role$.next('admin');
      return true;
    }
    if (username === 'user' && password === '123') {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('role', 'user');
      this.loggedIn$.next(true);
      this.role$.next('user');
      return true;
    }
    return false;
  }

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }
  getRoleSnapshot() {
    return this.role$.value;
  }
  getRoleObservable() {
    return this.role$.asObservable();
  }
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.loggedIn$.next(false);
    this.role$.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
