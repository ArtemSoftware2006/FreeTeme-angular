import { Component, Input } from '@angular/core';
import { AuthorizationService } from '../../../services/authorization/authorization.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PhotoService } from '../../../services/photo/photo.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() image? : File;
  imageUrl : string = "";
  user? : User;

  constructor(public authService : AuthorizationService,
    public photoService : PhotoService,
    public router : Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user as User
    });

    if (this.user) {
      this.photoService.getAvatat(this.user.id).subscribe(avatar => {
        this.setAvatar(avatar as File);
      },
      error => {
        console.log(error);
        this.setDefaultAvatar();
      });      
    } else {
      this.setDefaultAvatar();
    }
  }

  setDefaultAvatar() {
    this.image = this.photoService.getDefaultAvatar();
    this.imageUrl = this.photoService.getDefaultAvatarUrl();
  }

  setAvatar(avatar : File) {
    this.image = avatar;
    this.imageUrl = URL.createObjectURL(this.image);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  upload($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.item(0);

    if (file) {
      this.photoService.setAvatar(this.user!.id, file).subscribe(
        () => {
          this.setAvatar(file);
        }
      );
    }
  }
}
