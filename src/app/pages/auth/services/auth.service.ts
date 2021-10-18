import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { JWTTokenService } from 'src/app/shared/services/jwt-token.service';
import { UrlConstants } from 'src/app/shared/utils/url-constants';
import { ApiResponse } from 'src/app/shared/models/api-response.model';


/**
 * Auth service which contains all methods to register, login
 * Start the timeout timer to refresh the token and contains user information
 */

@Injectable()
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public showTokenTimeoutModal = new BehaviorSubject(false);
    public user: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtTokenService: JWTTokenService,
        private sessionStorage: SessionStorageService
        ) {
        this.userSubject = new BehaviorSubject<User>(null);
        this.user = this.userSubject.asObservable();
    }

    /**
     * Sends consumer credentials to the back-end to login the consumer
     * @param credentials object
     * @returns Observable<User>
     */
    signIn(credentials): Observable<ApiResponse> {
        return this.http.post('/api/auth/signIn', credentials, { withCredentials: true })
            .pipe(tap((response: ApiResponse) => {
                if (response) {
                    const { id, access_token} = response.result;
                    this.userSubject.next(response.result);
                    this.sessionStorage.setSession('PROFILE-ID', id);
                    this.sessionStorage.setSession('SESSION-AUTH-TK', access_token);
                }
                return response;
            }));
    }

    /**
     * Sends consumer credentials to the back-end to register the consumer
     * @param credentials object
     * @returns Observable<User>
     */
    signUp(credentials): Observable<ApiResponse> {
        return this.http.post('/api/auth/signUp', credentials, { withCredentials: true })
            .pipe(tap((response: ApiResponse) => {
                this.userSubject.next(response.result);
                return response;
            }));
    }

    /**
     * Gets user info from the subject variable
     * @returns BehaviorSubject<User>
     */
    get userValue(): User {
        return this.userSubject.value;
    }

    /**
     * Clears consumer credentials after successfully logout action
     */
    logout() {
        this.sessionStorage.signOut();
        this.userSubject.next(null);
        this.router.navigate([UrlConstants.HOME]);
    }

    /**
     * Checks whether the consumer is logged in
     * @returns boolean
     */
    isLoggedIn(): boolean {
        return this.jwtTokenService.getDecodeToken() ? Object.keys(this.jwtTokenService.getDecodeToken()).length >= 1 : false;
    }
}
