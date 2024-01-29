import { ApprovedService } from './../../services/approved/approved.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from './../../services/proposal/proposal.service';
import { Subject } from 'rxjs';
import { UserCardComponent } from '../../components/cards/user-card/user-card.component';
import { Component } from '@angular/core';
import { UserCard } from '../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProposalDetails } from '../../models/proposal';

@Component({
  selector: 'app-user-proposal-details-page',
  standalone: true,
  imports: [UserCardComponent, MatButtonModule, MatCardModule],
  templateUrl: './user-proposal-details-page.component.html',
  styleUrl: './user-proposal-details-page.component.scss'
})
export class UserProposalDetailsPageComponent {
  proposalId? : number;
  userSubject : Subject<UserCard> = new Subject<UserCard>();
  proposal? : ProposalDetails;

  constructor(public proposalService : ProposalService,
    public activatedRoute : ActivatedRoute,
    public approvedService : ApprovedService,
    public router : Router) { }

  ngOnInit(): void {

    this.proposalId = this.activatedRoute.snapshot.params['id'];

    this.proposalService.get(Number(this.proposalId))
    .subscribe((proposal : ProposalDetails) => {
      this.proposal = proposal;
      this.userSubject.next(proposal.user as UserCard);
    })
  }

  approved() {
    if (this.proposal) {
      this.approvedService.approved(this.proposal.dealId, this.proposal.id)
      .subscribe(() => 
      {
        this.router.navigate(['/proposals-on-deal', this.proposal?.dealId]);
      }, 
      error => 
      {
        console.log(error);
      }); 
    }
  }
}
