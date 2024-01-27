import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealDetails } from '../../models/deal';
import { DealService } from '../../services/deal/deal.service';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserCardComponent } from '../../components/cards/user-card/user-card.component';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { User} from '../../models/user';
import { ProposalCreaeteFormComponent } from '../../components/form/proposal-creaete-form/proposal-creaete-form.component';
import { Observable, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserCard } from '../../models/user';

@Component({
  selector: 'app-deal-details-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, UserCardComponent, ProposalCreaeteFormComponent, AsyncPipe],
  templateUrl: './deal-details-page.component.html',
  styleUrl: './deal-details-page.component.scss'
})
export class DealDetailsPageComponent {

  dealObserve: Observable<DealDetails> = new Observable<DealDetails>();
  deal? : DealDetails;
  userCreator : Subject<UserCard> = new Subject<UserCard>();
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
        this.dealObserve = this.dealService.get(Number(id), this.user?.id as number);
  
        this.dealObserve.subscribe((deal : DealDetails) => {
          this.userCreator.next(deal.creatorUser);
          console.log(deal);
          this.deal = deal;
        },
        error => {
          console.log(error);
        });
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

  respondDeal() {
    this.isRespondBtnDisabled = true;
    this.isProposalFormDisables = false;
  }
}
