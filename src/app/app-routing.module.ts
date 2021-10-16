import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UrlConstants } from './shared/utils/url-constants';

const routes: Routes = [
  {  path: '',  redirectTo: UrlConstants.HOME, pathMatch: 'full' },
  {  path: UrlConstants.HOME, loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  {  path: UrlConstants.AUTH, loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  {  path: UrlConstants.DASHBOARD, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {  path: UrlConstants.PAGE_NOT_FOUND,  loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
  {  path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
