import { Component } from '@angular/core';
import { User } from '../../models/user';
import { DealCard, DealDetails, convertToDealCard } from '../../models/deal';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { DealService } from '../../services/deal/deal.service';
import { DealCardComponent } from '../../components/cards/deal-card/deal-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-deals-page',
  standalone: true,
  imports: [DealCardComponent, NgFor],
  templateUrl: './user-deals-page.component.html',
  styleUrl: './user-deals-page.component.scss'
})
export class UserDealsPageComponent {
  user? : User;
  deals? : DealCard[];
  
  constructor(public authService : AuthorizationService,
    public dealService : DealService) { }
    
    ngOnInit(): void {
      this.authService.getUser().subscribe(user => {
        this.user = user as User;
      });

      this.dealService.getByUserId(this.user?.id as number)
      .then((deals : DealDetails[]) => {

        this.deals = convertToDealCard(deals);
      });
    } 
}
