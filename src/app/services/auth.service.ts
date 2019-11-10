import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as auth0 from 'auth0-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};

const AUTH_CONFIG = {
  clientID: '2Q9woUlY4SnJ7YHjSmtXIrmhrNvU0cec',
  domain: 'dev-asc01.eu.auth0.com'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: 'https://localhost:4200/lessons',
    scope: 'openid email'
  });

  constructor(private http: HttpClient, private router: Router) { }

  public login(): void {
    this.auth0.authorize({
      mode: 'login'
    });
  }

  public signUp() {
    this.auth0.authorize({
      mode: 'signUp'
    });
  }

  public retrieveAuthInfoFromUrl() {
    this.auth0.parseHash((error, authenticationResult) => {

      if (error) {
        console.log('Could not parse the hash', error);
      } else if (authenticationResult && authenticationResult.idToken) {
        window.location.hash = '';
        console.log('Authentication was successful, authentication result: ', authenticationResult);
        // this.auth0.client.userInfo(authenticationResult.accessToken, (error, userProfile) => {})
        this.setSession(authenticationResult);
      }

    });
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setSession(authenticationResult: auth0.Auth0DecodedHash) {

    const expiresAt = moment().add(authenticationResult.expiresIn, 'seconds');
    localStorage.setItem('id_token', authenticationResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {

    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/lessons']);


  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

}
