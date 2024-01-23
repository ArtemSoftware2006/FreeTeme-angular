import { User, UserUpdateProfile } from './../../../models/user';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfile } from '../../../models/user';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '../../UI/input/form-input/form-input.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { CategoryInputComponent } from '../../UI/input/category-input/category-input.component';
import { SelectedCategory } from '../../../models/category';

@Component({
  selector: 'app-profile-edit-form',
  standalone: true,
  imports: [FormInputComponent, ReactiveFormsModule, MatButtonModule, CategoryInputComponent, NgIf],
  templateUrl: './profile-edit-form.component.html',
  styleUrl: './profile-edit-form.component.scss'
})
export class ProfileEditFormComponent {
  @Input() profile? : UserProfile;
  @Output() setIsEditProfile : EventEmitter<UserUpdateProfile | null> 
    = new EventEmitter<UserUpdateProfile | null>();
  categories :number[] = []
  selectedCategories : SelectedCategory[] = [];
  user? : User;
  editProfileForm! : FormGroup; 
  constructor(public formBuilder : FormBuilder,
    public userService : UserService,
    public authService : AuthorizationService) { }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName : new FormControl(this.profile?.firstName, [Validators.required]),
      lastName : new FormControl(this.profile?.lastName, [Validators.required]),
      secondName : new FormControl(this.profile?.secondName, [Validators.required]),
      phone : new FormControl(this.profile?.phoneNumber, [Validators.required]),
      email : new FormControl(this.profile?.email, [Validators.required, Validators.email]),
      description : new FormControl(this.profile?.description, [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]),
  
    });

    this.authService.getUser().subscribe(user => {
      this.user = user as User;
    });

    this.selectedCategories = (this.profile as UserProfile).categories.map(category => {
      return {id: category.id, name: category.name, isSelected: true}
    });

    this.categories = (this.profile as UserProfile).categories.map(category => {
      return category.id
    });
  }
  
  toggleCategory($event: SelectedCategory) {
    const category = this.categories.find(x => x == $event.id);

    if (category) {
      if (!$event.isSelected) {
        this.selectedCategories = this.selectedCategories.filter(x => x.id != $event.id);
        this.categories = this.categories.filter(x => x != $event.id);
      }
    } else {
      if ($event.isSelected) {
        this.selectedCategories = [...this.selectedCategories, $event];
        this.categories = [...this.categories, $event.id]; 
      }      
    }
  }

  onSubmit() {
    if (this.editProfileForm.valid) {

      const profile : UserUpdateProfile = {
        id : this.user?.id as number,
        firstName : this.editProfileForm.get('firstName')?.value,
        secondName : this.editProfileForm.get('secondName')?.value,
        lastName : this.editProfileForm.get('lastName')?.value,
        phoneNumber : this.editProfileForm.get('phone')?.value,
        description : this.editProfileForm.get('description')?.value,
        categories : this.selectedCategories,
      };

      this.userService.updateProfile({...profile, categoryIds : this.categories})
      .subscribe(() => {
        this.setIsEditProfile.emit(profile);
      },
      error => {
        console.log(error);
        this.setIsEditProfile.emit(null);
      });
    }
  }
}
