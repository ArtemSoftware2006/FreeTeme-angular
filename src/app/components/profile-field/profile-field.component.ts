import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-field',
  standalone: true,
  imports: [],
  templateUrl: './profile-field.component.html',
  styleUrl: './profile-field.component.scss'
})
export class ProfileFieldComponent {
  @Input() label: string = '';
  @Input() value: string = '';
}
