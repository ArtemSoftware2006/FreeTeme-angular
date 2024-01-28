import { Component, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from '../../components/cards/user-card/user-card.component';
import { ProposalCreaeteFormComponent } from '../../components/form/proposal-creaete-form/proposal-creaete-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DealDetails } from '../../models/deal';
import { User } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { DealService } from '../../services/deal/deal.service';

@Component({
  selector: 'app-user-deal-details-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, UserCardComponent, ProposalCreaeteFormComponent],
  templateUrl: './user-deal-details-page.component.html',
  styleUrl: './user-deal-details-page.component.scss'
})
export class UserDealDetailsPageComponent {
  deal? : DealDetails;
  user? : User;
  isRespondBtnDisabled = false;
  isProposalFormDisables = true;
  onCreatedProposal : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute,
    public dealService : DealService,
    public authService : AuthorizationService,
    public router : Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.authService.getUser().subscribe(user => {
      this.user = user as User;

      if (id != null) {
        this.dealService.get(Number(id), this.user?.id as number)
        .subscribe((deal : DealDetails) => {
          this.deal = deal;
          console.log(deal);
        }, 
        (error) => {
          console.log(error);
        })
      }
    })

    this.onCreatedProposal.subscribe(result => {
      if (result) {
        this.router.navigate(['/deals']);
      } 
      else {
        //TODO Создать выплывающее сообщение
        console.log("MESSAGE")
      }
    })
  }

  showProposals() {
    this.router.navigate(['/proposals-on-deal', this.deal?.id]);
  }
}
