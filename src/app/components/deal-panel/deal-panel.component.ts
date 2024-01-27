import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DealService } from '../../services/deal/deal.service';
import { DealDetails } from '../../models/deal';
import { User } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { RouterLink } from '@angular/router';
import { ApprovedService } from '../../services/approved/approved.service';

const NEW_ICON =  `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
</svg>
`;
@Component({
  selector: 'app-deal-panel',
  standalone: true,
  imports: [MatButtonModule, MatBadgeModule, MatIconModule, RouterLink],
  templateUrl: './deal-panel.component.html',
  styleUrl: './deal-panel.component.scss'
})
export class DealPanelComponent {

  approvedDealsCount : number = 0;
  deals? : DealDetails[];
  user? : User;

  constructor(iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    public dealService: DealService,
    public authService: AuthorizationService,
    public approvedService : ApprovedService) 
  {
    iconRegistry.addSvgIconLiteral('ok-icon', sanitizer.bypassSecurityTrustHtml(NEW_ICON));
  }

  ngOnInit(): void {

    this.authService.getUser().subscribe(user => {
      this.user = user as User;

      this.approvedService.getDeals(this.user?.id as number)
      .subscribe(result => {
        this.approvedDealsCount = result.length;
      });
    })

    this.dealService.getByUserId(this.user?.id as number)
    .subscribe(result => {
      this.deals = result as DealDetails[];  
    },
    (error) => {
      console.log(error);
    })
  }
}
