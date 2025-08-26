import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Project {
  id: number;
  name: string;
  description: string;
  ownerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    { id: 1, name: 'A', description: 'admin 1 2 3 4', ownerId: 1},
    { id: 2, name: 'B', description: 'admin 5 6 7 8', ownerId: 2},
    { id: 3, name: 'C', description: 'admin 9 10 11 12', ownerId: 3},
    { id: 4, name: 'D', description: 'admin 13 22 32 42', ownerId: 4},
    { id: 5, name: 'E', description: 'admin 52 6f 7f 8f', ownerId: 5},
    { id: 6, name: 'F', description: 'admin 91 109 119 129', ownerId: 6},
  ];
  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  addProject(project: Project): Observable<Project> {
    project.id = this.projects.length + 1;
    this.projects.push(project);
    return of(project);
  }

  updateProject(project: Project): Observable<Project> {
    this.projects = this.projects.map(u => u.id === project.id ? project : u);
    return of(project);
  }

  deleteProject(id: number): Observable<void> {
    this.projects = this.projects.filter(u => u.id !== id);
    return of(void 0);
  }
}
