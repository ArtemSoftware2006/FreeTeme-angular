import { MatButtonModule } from '@angular/material/button';
import { DealCard } from './../../models/deal';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-deal-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatChipsModule, NgFor],
  templateUrl: './deal-card.component.html',
  styleUrl: './deal-card.component.scss'
})
export class DealCardComponent {
  @Input() dealCard? : DealCard;
}
