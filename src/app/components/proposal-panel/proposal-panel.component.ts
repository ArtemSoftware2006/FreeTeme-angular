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

const NEW_ICON =  `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
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

  proposals? : ProposalDetails[];
  user? : User;
  
  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    public proposalService: ProposalService,
    public authService: AuthorizationService) {
    iconRegistry.addSvgIconLiteral('bell-icon', sanitizer.bypassSecurityTrustHtml(NEW_ICON));
  }
  ngOnInit(): void {
    
    this.authService.getUser().subscribe(user => {
      this.user = user as User;
    });
    
    this.proposalService.getByUserId(this.user?.id as number)
    .then(result => {
      this.proposals = result;
      console.log(this.proposals);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
