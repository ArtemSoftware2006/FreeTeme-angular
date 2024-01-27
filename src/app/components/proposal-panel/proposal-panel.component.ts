import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { ProposalService } from '../../services/proposal/proposal.service';
import { ProposalDetails } from '../../models/proposal';
import { User } from '../../models/user';
import { RouterLink } from '@angular/router';
import { ApprovedService } from '../../services/approved/approved.service';

const NEW_ICON =  `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
</svg>
`;

@Component({
  selector: 'app-proposal-panel',
  standalone: true,
  imports: [MatButtonModule, MatBadgeModule, MatIconModule, RouterLink],
  templateUrl: './proposal-panel.component.html',
  styleUrl: './proposal-panel.component.scss'
})
export class ProposalPanelComponent {

  approvedProposalsCount : number = 0;
  proposals? : ProposalDetails[];
  user? : User;
  
  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    public proposalService: ProposalService,
    public authService: AuthorizationService,
    public approvedService : ApprovedService) {
    iconRegistry.addSvgIconLiteral('ok-icon', sanitizer.bypassSecurityTrustHtml(NEW_ICON));
  }
  ngOnInit(): void {
    
    this.authService.getUser().subscribe(user => {
      this.user = user as User;

      this.approvedService.getProposals(this.user?.id as number)
      .subscribe(result => {
        this.approvedProposalsCount = result.length;
      })
    });
    
    this.proposalService.getByUserId(this.user?.id as number)
    .subscribe(result => {
      this.proposals = result;
      console.log(this.proposals);
    }
    ,error => {
      console.log(error);
    });
  }
}
