import {Component, inject, OnInit} from '@angular/core';
import { Observable, map } from 'rxjs';
import {UsersService} from '../../services/users.service';
import {AsyncPipe} from '@angular/common';
import {ProjectService} from '../../services/project.service';
import {TasksService} from '../../services/task.service';
import {ActivityChartComponent} from '../../share/ActivityChart.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    ActivityChartComponent,
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersCount$!: Observable<number>;
  projectsCount$!: Observable<number>;
  tasksCount$!: Observable<number>;
  private usersService= inject(UsersService);
  private projectsService=inject(ProjectService);
  private tasksService= inject(TasksService);


  ngOnInit(): void {
    this.usersCount$ = this.usersService.getUsers().pipe(map(users => users.length));
    this.projectsCount$ = this.projectsService.getProjects().pipe(map(projects => projects.length));
    this.tasksCount$ = this.tasksService.getTasks().pipe(map(tasks => tasks.length));
  }
}
