import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../utils/url-constants';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private static projectKey = 'MOV';

  constructor(private router: Router) {}
  /**
   * @whatItDoes Method to clear the session storage
   */
  public signOut() {
    window.sessionStorage.clear();
  }

  /**
   * @whatItDoes Method to set the session storage and encrypt the value
   * @returns string
   */

  public setSession(name: string, value: string) {
    const encryptSession = btoa(escape(value));
    window.sessionStorage.setItem(SessionStorageService.projectKey + '-' + name, encryptSession);
  }

  /**
   * @whatItDoes Returns the decrypted session value
   * @returns string
   */
  public getSessionStorage(value: string): string {
    const decryptSession = sessionStorage.getItem(SessionStorageService.projectKey + '-' + value);
    try {
      atob(unescape(decryptSession))
    } catch(error) {
      this.signOut();
      this.router.navigate([UrlConstants.AUTH]);
    }
    return decryptSession ? atob(unescape(decryptSession)) : '';
  }

  /**
   * @whatItDoes Get the project key of the session storage
   * @returns string
   */
  public getProjectKey(): string {
    return SessionStorageService.projectKey;
  }
}
