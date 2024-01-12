import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-link',
  standalone: true,
  imports: [],
  templateUrl: './circle-link.component.html',
  styleUrl: './circle-link.component.scss'
})
export class CircleLinkComponent {
  @Input() link : string = "#"
}
