import { Injectable, AfterViewInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UrlConstants } from '../utils/url-constants';

@Injectable()

export class JWTTokenService {

  jwtToken = this.sessionStorage.getSessionStorage('SESSION-AUTH-TK');
  decodedToken: User;

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
  ) {
    this.decodedToken = this.getDecodeToken();
  }

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

  getDecodeToken(): User {
    const token = this.sessionStorage.getSessionStorage('SESSION-AUTH-TK');
    if (token) {
      try {
        return jwt_decode(token);
      } catch (error) {
        this.router.navigate([UrlConstants.AUTH]);
        return null;
      }
    }
    return null;
  }
}
