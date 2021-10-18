import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { homeRoutes } from './home-routers';
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MovieService } from '../dashboard/services/movie.service';
import { CinemaModule } from 'projects/cinema/src/public-api';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    CinemaModule,
    RouterModule.forChild(homeRoutes),
    SharedModule
  ],
  providers: [
    MovieService
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
