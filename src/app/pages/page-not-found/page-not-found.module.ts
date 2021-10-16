import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { pageNotFoundRoutes } from './page-not-found-routers';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(pageNotFoundRoutes),
    CommonModule
  ],
  exports: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
