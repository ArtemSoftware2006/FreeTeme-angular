import { PrimaryButtonComponent } from './../../UI/button/primary-button/primary-button.component';
import { Component } from '@angular/core';
import { FormInputComponent } from '../../UI/input/form-input/form-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormInputComponent, PrimaryButtonComponent, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  handleClick() {
    console.log("click");
  }

  onSubmit() {
    console.log(this.loginForm.controls.login.value);
    console.log(this.loginForm.controls.login.value)
    console.log(this.loginForm.controls.password.value);
  }
}
