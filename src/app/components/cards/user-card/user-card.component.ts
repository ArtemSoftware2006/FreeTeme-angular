import { Component, Input } from '@angular/core';
import { UserCard } from '../../../models/user';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user? : UserCard

  ngOnInit(): void {
    this.user = {
      login: 'Artem',
      id : 0,
      description : 'some description',
      isVIP : false,
      categories : {},
      avatar : null
    }
  }
}
