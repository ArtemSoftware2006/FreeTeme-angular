import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { UserProfile } from '../../../models/user';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesPanelComponent } from '../../UI/chips/categories-panel/categories-panel.component';
import { PhotoService } from '../../../services/photo/photo.service';

@Component({
  selector: 'app-user-contact-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CategoriesPanelComponent],
  templateUrl: './user-contact-card.component.html',
  styleUrl: './user-contact-card.component.scss'
})
export class UserContactCardComponent {
  @Input() userSubject : Subject<UserProfile> = new Subject<UserProfile>();
  @Input() userId? : number;
  user : UserProfile = {} as UserProfile;
  avatar? : File;
  avatarUrl : string = "";

  constructor(public photoService : PhotoService) { }

  ngOnInit(): void {
    this.userSubject.subscribe(user => {
      this.user = user;

      if (this.userId) {
        this.photoService.getAvatat(this.userId).subscribe(avatar => {
          this.setAvatar(avatar as File);
        },
        error => {
          this.setDefaultAvatar();
          console.error(error);
        });  
      }
    });
  }

  setDefaultAvatar() {
    this.avatar = this.photoService.getDefaultAvatar();
    this.avatarUrl = this.photoService.getDefaultAvatarUrl();
  }

  setAvatar(avatar : File) {
    this.avatar = avatar;
    this.avatarUrl = URL.createObjectURL(this.avatar);
  }
}
