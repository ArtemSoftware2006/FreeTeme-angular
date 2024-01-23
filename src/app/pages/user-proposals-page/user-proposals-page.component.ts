import { Component } from '@angular/core';
import { ProposalDetails } from '../../models/proposal';
import { User } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { ProposalService } from '../../services/proposal/proposal.service';
import { ProposalCardComponent } from '../../components/cards/proposal-card/proposal-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-proposals-page',
  standalone: true,
  imports: [ProposalCardComponent, NgFor],
  templateUrl: './user-proposals-page.component.html',
  styleUrl: './user-proposals-page.component.scss'
})
export class UserProposalsPageComponent {
  user? : User;
  proposals? : ProposalDetails[]

  constructor(public authService : AuthorizationService,
    public proposalService: ProposalService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user as User;
    });

    this.proposalService.getByUserId(this.user?.id as number)
    .then((proposals : ProposalDetails[]) => {
      this.proposals = proposals;
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
