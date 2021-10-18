import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { JWTTokenService } from 'src/app/shared/services/jwt-token.service';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { AuthService } from '../../services/auth.service';

import { LoginComponent } from './login.component';

const onLoginResponse = {
  message: "logged",
  result: {
    id: 1,
    firstName: "Alexander",
    lastName: "Petrov",
    email: "example@gmail.com",
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let httpClient: HttpClient;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule
      ], 
      providers: [
        AuthService, 
        HttpClient, 
        HttpHandler,
        JWTTokenService,
        Overlay,
        MatSnackBar
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the form to invalid when entering empty values in all fields', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    });

    component.submitLoginForm();
    expect(component.loginForm.status).toBe('INVALID');
  });

  it('should show error for invalid email', () => {
    component.loginForm.setValue({
      email: 'fdafaw.fpiewj',
      password: ''
    });
    const emailFormControl = component.loginForm.get('email').hasError('email');

    expect(emailFormControl).toBeTrue();
  });

  it('should navigate to the dashboard on success', () => {
    spyOn(router, 'navigate');
    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: '123456'
    })
    spyOn(authService, 'signIn').and.returnValue(of(onLoginResponse));
    component.submitLoginForm();
    expect(router.navigate).toHaveBeenCalledWith([`${UrlConstants.DASHBOARD}`]);
  });

  it('should not navigate to the dashboard on wrong credentials', () => {
    spyOn(router, 'navigate');
    component.loginForm.setValue({
      email: 'wrongemail@gmail.com',
      password: '123456'
    })
    spyOn(authService, 'signIn').and.returnValue(throwError(new HttpErrorResponse({ status: 404, statusText: 'User not found!', error: { message: 'User not found !'}})));
    component.submitLoginForm();
    expect(router.navigate).not.toHaveBeenCalledWith([`${UrlConstants.DASHBOARD}`]);
  });

  it('should show snack bar message on wrong credentials', () => {
    fakeAsync(() => {
      spyOn(router, 'navigate');
      component.loginForm.setValue({
        email: 'wrongemail@gmail.com',
        password: '123456'
      })
      spyOn(authService, 'signIn').and.returnValue(throwError(new HttpErrorResponse({ status: 404, statusText: 'User not found!', error: { message: 'User not found !'}})));
      component.submitLoginForm();
      tick();
      expect(fixture.nativeElement.querySelector('.mat-simple-snackbar').textContent).toContain('User not found!');
    })
  });
});
