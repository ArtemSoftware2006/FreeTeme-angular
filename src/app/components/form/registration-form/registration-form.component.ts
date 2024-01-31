import { NotificationService } from './../../../services/notification/notification.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryButtonComponent } from '../../UI/button/primary-button/primary-button.component';
import { FormInputComponent } from '../../UI/input/form-input/form-input.component';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, PrimaryButtonComponent, FormInputComponent],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  registerForm!: FormGroup;
  constructor(public builder: FormBuilder,
    public authService : AuthorizationService,
    public router : Router,
    public notificationService : NotificationService) {  }

  ngOnInit() {
    this.registerForm = this.builder.nonNullable.group({
      login: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      email : new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const registerModel = {
        login : this.registerForm.controls["login"].value as string,
        password : this.registerForm.controls["password"].value as string,
        passwordConfirm : this.registerForm.controls["passwordConfirm"].value as string,
        email : this.registerForm.controls["email"].value as string
      };

      this.authService.registration(registerModel)
      .subscribe(() => {
          this.router.navigate(['/home']);
        },
        (error : HttpErrorResponse) => {
          console.log(error);

          if (error.error.errors != null) {
            this.notificationService.showError(error.error?.errors?.Password[0], 'Error');
          }
          else {
            this.notificationService.showError(error.error, 'Error');
          }
        });
    }
  }
}
