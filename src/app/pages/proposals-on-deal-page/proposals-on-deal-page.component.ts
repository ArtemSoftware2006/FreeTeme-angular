import { Component } from '@angular/core';
import { ProposalDetails } from '../../models/proposal';
import { ProposalService } from '../../services/proposal/proposal.service';
import { ProposalCardComponent } from '../../components/cards/proposal-card/proposal-card.component';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-proposals-on-deal-page',
  standalone: true,
  imports: [ProposalCardComponent, NgFor],
  templateUrl: './proposals-on-deal-page.component.html',
  styleUrl: './proposals-on-deal-page.component.scss'
})
export class ProposalsOnDealPageComponent {
  dealId? : number 
  proposals? : ProposalDetails[]

  constructor(public proposalService : ProposalService,
    public route : ActivatedRoute) { }

  ngOnInit(): void {

    this.dealId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.dealId) {
      this.proposalService.getByDealId(this.dealId)
      .subscribe((proposals : ProposalDetails[]) => {
        this.proposals = proposals;
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
