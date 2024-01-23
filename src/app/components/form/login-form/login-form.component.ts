import { PrimaryButtonComponent } from './../../UI/button/primary-button/primary-button.component';
import { Component } from '@angular/core';
import { FormInputComponent } from '../../UI/input/form-input/form-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormInputComponent, PrimaryButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  constructor(public authService : AuthorizationService,
    public router : Router) { }

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
  });

  handleClick() {
    console.log("click");
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const loginModel = {
        login : this.loginForm.controls["login"].value as string,
        password : this.loginForm.controls["password"].value as string
      }

      this.authService.login(loginModel)
      .subscribe(result => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      });
    }
  }
}
