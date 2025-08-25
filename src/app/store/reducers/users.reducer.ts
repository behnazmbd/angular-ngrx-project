import { createReducer, on } from '@ngrx/store';
import { User } from '../../services/users.service';
import * as UsersActions from '../actions/users.action';

export interface UsersState {
  users: User[];
}

export const initialState: UsersState = { users: [] };

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UsersActions.addUser, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UsersActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u)
  })),
  on(UsersActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(u => u.id !== id)
  }))
);
