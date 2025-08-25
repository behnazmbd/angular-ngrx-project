import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  private auth = inject(AuthService);
  private router = inject(Router);
  private formBuilder= inject(FormBuilder);
  constructor() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    const { username, password } = this.loginForm.value;
    const success = this.auth.login(username, password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Username or password is incorrect');
    }
  }
}
