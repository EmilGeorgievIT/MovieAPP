import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { IntroBannerComponent } from './components/intro-banner/intro-banner.component';
import { homeRoutes } from './home-routers';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomeComponent, IntroBannerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    SharedModule
  ],
  exports: [HomeComponent, IntroBannerComponent]
})
export class HomeModule { }
