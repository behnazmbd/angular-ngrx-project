import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
export interface User {
  id: number;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'admin', role: 'admin' },
    { id: 2, username: 'user1', role: 'user' },
    { id: 3, username: 'user2', role: 'user' },
  ];
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User): Observable<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return of(user);
  }

  updateUser(user: User): Observable<User> {
    this.users = this.users.map(u => u.id === user.id ? user : u);
    return of(user);
  }

  deleteUser(id: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== id);
    return of(void 0);
  }
}
