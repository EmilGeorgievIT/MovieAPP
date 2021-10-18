import { Component, OnDestroy  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { snackBarConfig } from 'src/app/shared/configs/snack-bar.config';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  
  subsctiption: Subscription;
  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  get emailInput() { return this.loginForm.get('email'); }
  get passwordInput() { return this.loginForm.get('password'); }
  

  submitLoginForm(): void {    
    if(this.loginForm.valid) {
      this.subsctiption = this.authService.signIn(this.loginForm.value)
      .subscribe((data) => {
        this.router.navigate([UrlConstants.DASHBOARD]);
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

  ngOnDestroy() {
    if (this.subsctiption) {
      this.subsctiption.unsubscribe();
    }
  }

}
