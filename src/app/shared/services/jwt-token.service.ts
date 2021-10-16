import { Injectable, AfterViewInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';

@Injectable()

export class JWTTokenService {

    jwtToken = this.sessionStorage.getSessionStorage('SESSION-AUTH-TK');
    decodedToken: { [key: string]: string };

    constructor(
      private sessionStorage: SessionStorageService,
      private router: Router,
    ) {}

    decodeToken() {
      const token = this.sessionStorage.getSessionStorage('SESSION-AUTH-TK');
      if (token) {
        try  {
          jwt_decode(token);
        } catch (error) {
          this.router.navigate(['/auth']);
          return true;
        }
        this.decodedToken = jwt_decode(token);
      }
    }

    getDecodeToken() {
      const token = this.sessionStorage.getSessionStorage('SESSION-AUTH-TK');
      if (token) {
        try  {
          return jwt_decode(token);
        } catch (error) {
          this.router.navigate(['/auth']);
          return true;
        }
      }
      return false;
    }

    getEmailId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.sub : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = +this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}
