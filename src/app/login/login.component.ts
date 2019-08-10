import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent {

  public loginForm: FormGroup;
  public messagePerErrorCode = {
    loginFailed: "Invalid credentials"
  };
  public errors = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['test@gmail.com', Validators.required],
      password: ['Password10', Validators.required]
    });
  }

  public login() {

    const value = this.loginForm.value;

    
  }
}
