import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ListMoviesComponent } from './components/list-movies/list-movies.component';
import { dashboardRoutes } from './dashboard-routers';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MovieService } from './services/movie.service';
import { PreviewMovieComponent } from './components/preview-movie/preview-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieComponent } from './components/movie/movie.component';
import { DashboardGuard } from 'src/app/shared/guards/dashboard-guard';
import { RangePipe } from 'src/app/shared/pipes/range-pipe';

@NgModule({
  declarations: [
    DashboardComponent, 
    AddMovieComponent, 
    RangePipe,
    ListMoviesComponent, 
    PreviewMovieComponent, 
    MovieComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  providers: [
    MovieService,
    DashboardGuard
  ]
})
export class DashboardModule { }
