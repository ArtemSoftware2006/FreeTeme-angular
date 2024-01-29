import { Component } from '@angular/core';
import { User } from '../../models/user';
import { DealCard, DealDetails, convertToDealCard } from '../../models/deal';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { DealService } from '../../services/deal/deal.service';
import { NgFor } from '@angular/common';
import { SearchToolComponent } from '../../components/search-tool/search-tool.component';
import { DealCardComponent } from '../../components/cards/deal-card/deal-card.component';

@Component({
  selector: 'app-user-deals-page',
  standalone: true,
  imports: [DealCardComponent, SearchToolComponent, NgFor],
  templateUrl: './user-deals-page.component.html',
  styleUrl: './user-deals-page.component.scss'
})
export class UserDealsPageComponent {
  user? : User;
  deals? : DealCard[];
  
  constructor(public authService : AuthorizationService,
    public dealService : DealService) { }
    
    ngOnInit(): void {
      this.getByUserId();
    } 

    onSearch($event: DealDetails[]) {
      this.deals = convertToDealCard($event);
    }
    onEmptySerch($event: boolean) {
      this.getByUserId();
    }

    getByUserId() {
      this.authService.getUser().subscribe(user => {
        this.user = user as User;
      });

      this.dealService.getByUserId(this.user?.id as number)
      .subscribe((deals : DealDetails[]) => {
        deals = deals.sort((a, b) => (a.status < b.status) ? 1 : -1);
        this.deals = convertToDealCard(deals);
      }, 
      error => {
        console.log(error);
      });
    }
}
