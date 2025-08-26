import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Task {
  id: number;
  title: string;
  projectId: number;
  assignedTo: number;
  status: 'todo' | 'in-progress' | 'done';
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [
    {id: 1, title: 'ABC', projectId: 1, assignedTo: 2, status: 'done'},
    {id: 2, title: 'CDE', projectId: 2, assignedTo: 3, status: 'in-progress'},
    {id: 3, title: 'FGI', projectId: 3, assignedTo: 0, status: 'todo'},
    {id: 4, title: 'jkl', projectId: 4, assignedTo: 2, status: 'done'},
    {id: 5, title: 'mno', projectId: 5, assignedTo: 4, status: 'in-progress'},
    {id: 6, title: 'pqr', projectId: 6, assignedTo: 7, status: 'todo'},
    {id: 7, title: 'ABC', projectId: 7, assignedTo: 5, status: 'done'},
    {id: 8, title: 'CDE', projectId: 8, assignedTo: 8, status: 'in-progress'},
    {id: 9, title: 'FGI', projectId: 9, assignedTo: 5, status: 'todo'},
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): Observable<Task> {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    this.tasks = this.tasks.map(u => u.id === task.id ? task : u);
    return of(task);
  }

  deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter(u => u.id !== id);
    return of(void 0);
  }
}
