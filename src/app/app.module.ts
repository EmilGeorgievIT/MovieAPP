import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { AuthService } from './pages/auth/services/auth.service';
import { JWTTokenService } from './shared/services/jwt-token.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthService,
    JWTTokenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
