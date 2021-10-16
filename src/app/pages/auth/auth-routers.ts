import { Routes } from '@angular/router';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const authRoutes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
        path: UrlConstants.LOGIN,
        component: LoginComponent
    },
    {
        path: UrlConstants.REGISTER,
        component: RegisterComponent
    }
  ]
}];
