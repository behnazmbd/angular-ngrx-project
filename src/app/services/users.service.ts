import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'admin', role: 'admin' },
    { id: 2, username: 'user1', role: 'user' },
    { id: 3, username: 'user2', role: 'user' }
  ];

  private users$ = new BehaviorSubject<User[]>([...this.users]);

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  addUser(user: Omit<User, 'id'>) {
    const maxId = this.users.length ? Math.max(...this.users.map(u => u.id)) : 0;
    const newUser = { ...user, id: maxId + 1 };
    this.users.push(newUser);
    this.users$.next([...this.users]);
  }

  updateUser(user: User) {
    this.users = this.users.map(u => u.id === user.id ? user : u);
    this.users$.next([...this.users]);
    return this.users$.asObservable();
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    this.users$.next([...this.users]);
    return this.users$.asObservable();
  }
}
