import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { dashboardRoutes } from './dashboard-routers';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MovieService } from './services/movie.service';

@NgModule({
  declarations: [
    DashboardComponent, 
    AddMovieComponent, 
    ListMoviesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  providers: [
    MovieService
  ]
})
export class DashboardModule { }
