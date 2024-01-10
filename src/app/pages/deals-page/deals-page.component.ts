import { Component } from '@angular/core';
import { DealCardComponent } from '../../components/deal-card/deal-card.component';

@Component({
  selector: 'app-deals-page',
  standalone: true,
  imports: [DealCardComponent],
  templateUrl: './deals-page.component.html',
  styleUrl: './deals-page.component.scss'
})
export class DealsPageComponent {

}
