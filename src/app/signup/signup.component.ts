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

  constructor(private formBuilder: FormBuilder, private readonly authService: AuthService) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
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
            console.log('User created succesfully');
          },
          console.error
        )
        
    }
  }

}
