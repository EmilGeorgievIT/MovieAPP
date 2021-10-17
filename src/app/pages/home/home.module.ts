import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { homeRoutes } from './home-routers';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    SharedModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
