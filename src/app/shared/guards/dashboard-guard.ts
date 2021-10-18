import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../pages/auth/services/auth.service'
import { snackBarConfig } from '../configs/snack-bar.config';
import { UrlConstants } from '../utils/url-constants';

@Injectable({ providedIn: 'root' })
export class DashboardGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    canActivate() {
        if(this.authService.isLoggedIn()) {
            return true;
        }
        this.snackBar.open('Please login first in Movie APP to access dashboard', 'Unauthorized access !', {
            duration:  snackBarConfig.duration,
            horizontalPosition: snackBarConfig.horizontalPosition,
            verticalPosition: snackBarConfig.verticalPosition
        });
        this.router.navigate([UrlConstants.HOME]);
        return false;
    }
}
