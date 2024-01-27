import { Subject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { UserCard } from '../../../models/user';
import { MatCardModule } from '@angular/material/card';
import { PhotoService } from '../../../services/photo/photo.service';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';
import { CategoriesPanelComponent } from '../../UI/chips/categories-panel/categories-panel.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, CategoriesPanelComponent, NgFor],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() userSubject : Subject<UserCard> = new Subject<UserCard>();
  user : UserCard = {} as UserCard;
  
  avatarUrl : string = "";

  constructor(public photoService : PhotoService) { }

  ngOnInit(): void {

    this.setDefaultAvatar();

    this.userSubject.subscribe(user => {
      this.user = user;

      this.photoService.getAvatat(user.id).subscribe(avatar => {
        this.setAvatar(avatar as File);
      },
      error => {
        this.setDefaultAvatar();
        console.error(error);
      }); 
    })
  }

  setDefaultAvatar() {
    this.user!.avatar = this.photoService.getDefaultAvatar();
    this.avatarUrl = this.photoService.getDefaultAvatarUrl();
  }

  setAvatar(avatar : File) {
    this.user!.avatar = avatar;
    this.avatarUrl = URL.createObjectURL(this.user?.avatar);
  }
}
