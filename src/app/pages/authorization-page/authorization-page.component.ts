import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/form/login-form/login-form.component';
import { NgIf } from '@angular/common';
import { RegistrationFormComponent } from '../../components/form/registration-form/registration-form.component';
import { PrimaryButtonComponent } from '../../components/UI/button/primary-button/primary-button.component';

@Component({
  selector: 'app-authorization-page',
  standalone: true,
  imports: [LoginFormComponent, RegistrationFormComponent, PrimaryButtonComponent, NgIf],
  templateUrl: './authorization-page.component.html',
  styleUrl: './authorization-page.component.scss'
})
export class AuthorizationPageComponent {
  isSignIn: boolean = true;
  
  changeForm() {
    this.isSignIn = !this.isSignIn;
  }
}
