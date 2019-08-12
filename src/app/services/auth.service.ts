import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, tap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);

  // public user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));
  public user$: Observable<User> = this.subject.asObservable();
  public isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  public isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private readonly httpClient: HttpClient) {
    httpClient.get<User>('/api/user')
      .subscribe((user: any) => this.subject.next(user ? user : ANONYMOUS_USER));
  }

  public signUp(email: string, password: string) {
    return this.httpClient.post<User>('/api/signup', { email, password }).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)));
  }

  public logout(): Observable<any> {
    return this.httpClient.post('/api/logout', null).pipe(
      shareReplay(),
      tap(user => this.subject.next(ANONYMOUS_USER))
    );
  }

  public login(email: string, password: string) {
    return this.httpClient.post<User>('/api/login', { email, password }).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)));
  }
}
