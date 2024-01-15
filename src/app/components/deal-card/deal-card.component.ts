import { DealCard } from './../../models/deal';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deal-card',
  standalone: true,
  imports: [],
  templateUrl: './deal-card.component.html',
  styleUrl: './deal-card.component.scss'
})
export class DealCardComponent {
  @Input() dealCard? : DealCard;
}
