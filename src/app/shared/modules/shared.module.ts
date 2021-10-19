import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { IntroBannerComponent } from 'src/app/shared/components/intro-banner/intro-banner.component';
import { FooterComponent } from '../components/footer/footer.component';


@NgModule({
  declarations: [HeaderComponent, IntroBannerComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    IntroBannerComponent,
    MaterialModule
  ]
})
export class SharedModule { }
