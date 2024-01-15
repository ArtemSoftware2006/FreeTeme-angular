import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { LinkComponent } from '../UI/link/link.component';
@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [ProfileComponent, LinkComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {

}
