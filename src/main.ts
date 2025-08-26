import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './app/store/reducers/users.reducer';
import { AppComponent } from './app/app.component';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ users: usersReducer }),
    provideStoreDevtools({ maxAge: 25 }),
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables())
  ]
});
