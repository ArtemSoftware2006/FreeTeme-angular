import { Component, Input } from '@angular/core';
import { ProposalDetails } from '../../../models/proposal';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-proposal-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './proposal-card.component.html',
  styleUrl: './proposal-card.component.scss'
})
export class ProposalCardComponent {
  @Input() proposal?: ProposalDetails;
}
