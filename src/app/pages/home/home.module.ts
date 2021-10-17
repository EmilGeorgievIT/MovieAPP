import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { homeRoutes } from './home-routers';
import { RouterModule } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MovieService } from '../dashboard/services/movie.service';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IvyCarouselModule,
    RouterModule.forChild(homeRoutes),
    SharedModule
  ],
  providers: [
    MovieService
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
