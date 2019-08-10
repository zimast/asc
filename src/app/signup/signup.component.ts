import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public signupForm: FormGroup;
  public errors: string[] = [];
  public messagePerErrorCode = {
    min: 'The minimum length is 10 characters',
    uppercase: 'At least one upper case character',
    digits: 'At lease one numeric character'
  }

  constructor(private formBuilder: FormBuilder, private readonly authService: AuthService) {
    this.signupForm = this.formBuilder.group({
      email: ['test@gmail.com', Validators.required],
      password: ['Password10', Validators.required],
      confirm: ['Password10', Validators.required]
    });
  }

  signUp() {
    const signupFormValue = this.signupForm.value;

    if (
      signupFormValue.email &&
      signupFormValue.password &&
      signupFormValue.password === signupFormValue.confirm
    ) {
      this.authService.signUp(signupFormValue.email, signupFormValue.password)
        .subscribe(
          () => {
            console.log('User created successfully');
          },
          response => this.errors = response.error.errors
        )

    }
  }

}
