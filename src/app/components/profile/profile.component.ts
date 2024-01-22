import { Component } from '@angular/core';
import { LinkComponent } from '../UI/link/link.component';
import { User } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LinkComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  public user? : User | null

  constructor(public authService : AuthorizationService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user
    })
  }
}
