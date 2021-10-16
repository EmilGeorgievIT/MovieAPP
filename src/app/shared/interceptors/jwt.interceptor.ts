import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { SessionStorageService } from '../services/session-storage.service';

/**
 * Jwt interceptor which clones the token and append that token to the header
 * That interceptor has to be imported always in the main module
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private sessionStorage: SessionStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.sessionStorage.getSessionStorage('SESSION-AUTH-TK');
        req = req.clone({
          url:  req.url,
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(req);
    }
}
