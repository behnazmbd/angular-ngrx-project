import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { UsersState } from '../../store/reducers/users.reducer';
import * as UsersActions from '../../store/actions/users.action';
import { selectAllUsers } from '../../store/selectors/users.selectors';
import { UsersService, User } from '../../services/users.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;
  userForm!: FormGroup;
  editingUser: User | null = null;
  isModalOpen = false;

  private store = inject(Store<UsersState>);
  private fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private toast = inject(ToastService);
  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required]
    });

    this.usersService.getUsers().subscribe(users => {
      this.store.dispatch(UsersActions.loadUsersSuccess({ users }));
    });

    this.users$ = this.store.select(selectAllUsers);
  }

  openAddModal() {
    this.editingUser = null;
    this.userForm.reset({ username: '', role: '' });
    this.userForm.markAsUntouched();
    this.userForm.markAsPristine();
    this.isModalOpen = true;
  }

  openEditModal(user: User) {
    this.editingUser = user;
    this.userForm.patchValue(user);
    this.isModalOpen = true;
  }

  submit() {
    if (this.userForm.invalid) {
      this.toast.show('Please fix the errors in the form!', 'error');
      return;
    }

    const formValue = this.userForm.value;
    if (this.editingUser) {
      const updatedUser = { ...this.editingUser, ...formValue };
      this.usersService.updateUser(updatedUser).subscribe(user => {
        this.store.dispatch(UsersActions.updateUser({ user }));
        this.toast.show('User edited successfully!', 'success');
      });
    } else {
      this.usersService.addUser(formValue).subscribe(user => {
        this.store.dispatch(UsersActions.addUser({ user }));
        this.toast.show('User added successfully!', 'success');
      });
    }
    this.userForm.reset();
    this.editingUser = null;
    this.isModalOpen = false;
  }

  closeModal() {
    this.userForm.reset();
    this.editingUser = null;
    this.isModalOpen = false;
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(() => {
      this.store.dispatch(UsersActions.deleteUser({ id }));
      this.toast.show('User deleted successfully!', 'success');
    });
  }
}
