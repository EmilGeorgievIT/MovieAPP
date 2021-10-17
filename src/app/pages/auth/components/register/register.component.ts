import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { snackBarConfig } from 'src/app/shared/configs/snack-bar.config';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  subsctiption: Subscription;
  
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required ]),
    lastName: new FormControl('', [Validators.required ]), 
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get emailInput() { return this.registerForm.get('email'); }
  get passwordInput() { return this.registerForm.get('password'); }
  
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  submitRegisterForm(): void {
    if(this.registerForm.valid) {
      this.subsctiption = this.authService.signUp(this.registerForm.value)
      .subscribe((data: ApiResponse) => {
        this.router.navigate([UrlConstants.AUTH]);
        this.snackBar.open(data.message, 'Success', {
          duration:  snackBarConfig.duration,
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition
        });

      }, error => {
        const errorMessage = error?.error?.message ? error.error.message : error;
        this.snackBar.open(errorMessage, 'Error', {
          duration:  snackBarConfig.duration,
          horizontalPosition: snackBarConfig.horizontalPosition,
          verticalPosition: snackBarConfig.verticalPosition
        });
      })
    }
  }
}
