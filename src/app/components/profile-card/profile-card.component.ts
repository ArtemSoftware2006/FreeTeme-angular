import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() login : string = "";
  @Input() email : string = "";
  //TODO Настроить картинку
  @Input() image : ImageBitmap | null = null;
}
