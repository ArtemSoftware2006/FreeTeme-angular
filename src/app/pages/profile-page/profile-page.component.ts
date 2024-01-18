import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import {Component, EventEmitter} from '@angular/core';
import { ProfileFieldComponent } from '../../components/profile-field/profile-field.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user/user.service';
import { IUser, UserProfile } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { NgFor, NgIf } from '@angular/common';
import { ProfileEditFormComponent } from '../../components/form/profile-edit-form/profile-edit-form.component';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFieldComponent, ProfileEditFormComponent, MatButtonModule, NgFor, NgIf],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  isEditProfile = false;
  profile? : UserProfile; 
  user? : IUser;
  profileKeyValues? : any[]
  constructor(public userService : UserService,
    public authService : AuthorizationService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user as IUser;
    })

    if (this.user != null) {
      this.userService.getUser(this.user.id)
      .then((profile : UserProfile) => {
        this.profile = profile;
        this.profileKeyValues = Object.entries(this.profile);
      }) 
      .catch((err) => {
        console.log(err);
      })
    }    
  }
  setIsEditProfile(mode: boolean) {
    this.isEditProfile = mode;
  }

  onProfileEdit($event: boolean) {
    console.log($event);
    this.isEditProfile = !$event;
  }
}
