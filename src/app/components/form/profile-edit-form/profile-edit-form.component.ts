import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfile } from '../../../models/user';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../UI/input/form-input/form-input.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-edit-form',
  standalone: true,
  imports: [FormInputComponent, ReactiveFormsModule, MatButtonModule, NgIf],
  templateUrl: './profile-edit-form.component.html',
  styleUrl: './profile-edit-form.component.scss'
})
export class ProfileEditFormComponent {
  @Input() profile? : UserProfile;
  @Output() setIsEditProfile : EventEmitter<boolean> = new EventEmitter<boolean>();
  editProfileForm! : FormGroup; 
  constructor(public authService : FormBuilder) 
  {}

  ngOnInit(): void {
    this.editProfileForm = this.authService.group({
      firstName : new FormControl(this.profile?.firstName, [Validators.required]),
      lastName : new FormControl(this.profile?.lastName, [Validators.required]),
      secondName : new FormControl(this.profile?.secondName, [Validators.required]),
      phone : new FormControl(this.profile?.phoneNumber, [Validators.required]),
      email : new FormControl(this.profile?.email, [Validators.required, Validators.email]),
      description : new FormControl(this.profile?.description, [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]),
    });
  }

  onSubmit() {
    console.log(this.editProfileForm);
    this.setIsEditProfile.emit(true);
  }
}
