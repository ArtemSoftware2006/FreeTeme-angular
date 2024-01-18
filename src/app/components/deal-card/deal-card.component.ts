import { MatButtonModule } from '@angular/material/button';
import { DealCard } from './../../models/deal';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deal-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './deal-card.component.html',
  styleUrl: './deal-card.component.scss'
})
export class DealCardComponent {
  @Input() dealCard? : DealCard;
}
