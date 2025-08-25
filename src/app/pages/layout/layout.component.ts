import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterOutlet} from '@angular/router';
import {ToastComponent} from '../../share/toast/toast.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  role = this.auth.getRoleSnapshot();
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
