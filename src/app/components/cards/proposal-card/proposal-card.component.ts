import { ApprovedService } from './../../../services/approved/approved.service';
import { Component, Input } from '@angular/core';
import { ProposalDetails } from '../../../models/proposal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const NEW_ICON =  `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
</svg>
`;

@Component({
  selector: 'app-proposal-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './proposal-card.component.html',
  styleUrl: './proposal-card.component.scss'
})
export class ProposalCardComponent {
  @Input() proposal?: ProposalDetails;

  constructor(public approvedService : ApprovedService,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer) 
    { 
      iconRegistry.addSvgIconLiteral('ok-icon', sanitizer.bypassSecurityTrustHtml(NEW_ICON));
    }

  approved() {
    if (this.proposal) {
      this.approvedService.approved(this.proposal.dealId, this.proposal.id)
      .subscribe(() => 
      {
        console.log("success")
      }, 
      error => 
      {
        console.log(error);
      }); 
    }
  }
  toContact() {
    throw new Error('Method not implemented.');
  }
}
