import { Component } from '@angular/core';
import { ProposalDetails } from '../../models/proposal';
import { ProposalService } from '../../services/proposal/proposal.service';
import { ProposalCardComponent } from '../../components/cards/proposal-card/proposal-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-proposals-on-deal-page',
  standalone: true,
  imports: [ProposalCardComponent, NgFor],
  templateUrl: './proposals-on-deal-page.component.html',
  styleUrl: './proposals-on-deal-page.component.scss'
})
export class ProposalsOnDealPageComponent {
  dealId? : number; 
  user? : User;
  proposals? : ProposalDetails[];

  constructor(public proposalService : ProposalService,
    public route : ActivatedRoute,
    public router : Router,
    public authService : AuthorizationService) { }

  ngOnInit(): void {

    this.authService.getUser()
    .subscribe((user) => {
      this.user = user as User;
    });

    this.dealId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.dealId || this.user) {
      this.proposalService.getByDealId(this.dealId)
      .subscribe((proposals : ProposalDetails[]) => {
        this.proposals = proposals;

        const confirmProposal = this.proposals
                                .find((proposal : ProposalDetails) => proposal.status === 1);

        if (confirmProposal) {
          this.router.navigate(['/contact-after-approved', this.user?.id as number, confirmProposal.userId]);
        }
      },
      error => {
        console.error(error);
      }); 
    }
    else {
      console.error("Property DealId is undefined");
    }
  }
}
