import { ProfileCardComponent } from '../../components/cards/profile-card/profile-card.component';
import { Component } from '@angular/core';
import { ProfileFieldComponent } from '../../components/profile-field/profile-field.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user/user.service';
import { User, UserProfile, UserUpdateProfile } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { NgFor, NgIf } from '@angular/common';
import { ProfileEditFormComponent } from '../../components/form/profile-edit-form/profile-edit-form.component';
import { MatChipsModule } from '@angular/material/chips';
import { ProposalPanelComponent } from '../../components/proposal-panel/proposal-panel.component';
import { DealPanelComponent } from '../../components/deal-panel/deal-panel.component';
import { CategoriesPanelComponent } from '../../components/UI/chips/categories-panel/categories-panel.component';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFieldComponent, 
       ProfileEditFormComponent, ProposalPanelComponent, DealPanelComponent,
       CategoriesPanelComponent,
       MatChipsModule, MatButtonModule, 
       NgFor, NgIf],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  isEditProfile = false;
  profile? : UserProfile;
  user? : User;
  profileKeyValues? : any[]
  constructor(public userService : UserService,
    public authService : AuthorizationService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user as User;
      console.log(this.user);
    })

    if (this.user != null) {
      this.userService.getUser(this.user.id)
      .subscribe((profile : UserProfile) => {
        /*
        * Лучше вот так
        * this.profile = {
          ...profile
        };
        *
        * */

        this.profile = {...profile};
        this.profileKeyValues = Object.entries(this.profile);
      },
      (err) => {
        console.log(err);
      });
    }
  }
  setIsEditProfile(mode: boolean) {
    this.isEditProfile = mode;
  }

  onProfileEdit($event: UserUpdateProfile | null) {
    if ($event) {
      this.profile = {
        login : this.profile?.login as string,
        email : this.profile?.email as string,
        isVIP : this.profile?.isVIP as boolean,
        balance : this.profile?.balance as number,
        ...$event as UserUpdateProfile,
      }

      console.log(this.profile);

      this.profileKeyValues = Object.entries(this.profile);

      this.isEditProfile = false;
    }
    else {
      this.isEditProfile = true;
    }
  }
}
