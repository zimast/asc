import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);

  public user$: Observable<User> = this.subject.asObservable();
  public isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  public isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private readonly httpClient: HttpClient) { }

  public signUp(email: string, password: string) {
    return this.httpClient.post<User>('/api/signup', { email, password }).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)));
  }
}
