import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User>(ANONYMOUS_USER);
  public user$: Observable<User> = this.subject.asObservable();
  // ALT: public isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => user.id !== undefined));
  public isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  public isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private httpClient: HttpClient) { }

  public signUp(email: string, password: string) { }
}
