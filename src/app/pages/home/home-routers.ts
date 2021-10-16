import { Routes } from '@angular/router';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
  {  path: UrlConstants.HOME, component: HomeComponent }
];
