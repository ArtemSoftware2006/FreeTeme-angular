import { Component } from '@angular/core';
import { LinkComponent } from '../UI/link/link.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
