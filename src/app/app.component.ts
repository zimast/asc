import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // public user$: Observable<User>;
  public isLoggedIn: boolean;
  public isLoggedOut: boolean;

  constructor(private readonly authService: AuthService) { }

  public ngOnInit(): void {
    this.authService.retrieveAuthInfoFromUrl();
  }

  signUp() {
    this.authService.signUp();
  }

  login() {
    this.authService.login();

  }

  logout() {
    this.authService.logout();
  }
}
