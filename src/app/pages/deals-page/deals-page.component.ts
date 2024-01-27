import { Component } from '@angular/core';
import { DealCardComponent } from '../../components/cards/deal-card/deal-card.component';
import { DealService } from '../../services/deal/deal.service';
import { DealCard, DealDetails, convertToDealCard } from '../../models/deal';
import { NgFor } from '@angular/common';
import { PrimaryButtonComponent } from '../../components/UI/button/primary-button/primary-button.component';
import { SearchToolComponent } from '../../components/search-tool/search-tool.component';
import { User } from '../../models/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
  selector: 'app-deals-page',
  standalone: true,
  imports: [DealCardComponent, NgFor, PrimaryButtonComponent, SearchToolComponent],
  templateUrl: './deals-page.component.html',
  styleUrl: './deals-page.component.scss'
})
export class DealsPageComponent {

  deals: DealCard[] = [];
  user? : User;
  page : number = 1;
  limit : number = 5;
  isLoadMoreDisabled : boolean = false;

  constructor(public dealService : DealService,
    public authService : AuthorizationService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user as User;
    })
    this.load();
  }

  loadMore() {
    this.page += 1;
    this.load();
  }

  load() {
    this.dealService.getDeals(this.page, this.limit, this.user?.id as number)
    .subscribe(result => {
      this.deals = [...this.deals, ...result.deals as DealCard[]];
      if (Number(result.total)  <= this.deals.length || this.deals.length != this.page * this.limit) {
        this.isLoadMoreDisabled = true;
      }
    },
    error => {
      console.log(error);
    })
  }

  onSearch($event: DealDetails[]) {
    this.isLoadMoreDisabled = true;
    this.deals = convertToDealCard($event);
  }

  onEmptySerch($event: boolean) {
    this.isLoadMoreDisabled = false;
    this.page = 1;

    this.dealService.getDeals(this.page, this.limit, this.user?.id as number)
    .subscribe(result => {
      this.deals = result.deals as DealCard[];
    },
    error => {
      console.log(error);
    });
  }
}
