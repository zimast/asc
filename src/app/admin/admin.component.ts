import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.form = this.fb.group({
      userEmail: ['student@gmail.com', Validators.required]
    });
  }

  public loginAsUser() {
    const val = this.form.value;
    if (val.userEmail) {
      this.authService.loginAsUser(val.userEmail)
        .subscribe(
          user => {
            console.log('Logged in as user with email ' + user.email);
            this.router.navigateByUrl('/');
          }
        );
    }
  }

}
