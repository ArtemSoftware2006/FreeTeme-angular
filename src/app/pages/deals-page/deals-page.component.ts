import { Component } from '@angular/core';
import { DealCardComponent } from '../../components/cards/deal-card/deal-card.component';
import { DealService } from '../../services/deal/deal.service';
import { DealCard } from '../../models/deal';
import { NgFor, registerLocaleData } from '@angular/common';
import { PrimaryButtonComponent } from '../../components/UI/button/primary-button/primary-button.component';
import { SearchToolComponent } from '../../components/search-tool/search-tool.component';

@Component({
  selector: 'app-deals-page',
  standalone: true,
  imports: [DealCardComponent, NgFor, PrimaryButtonComponent, SearchToolComponent],
  templateUrl: './deals-page.component.html',
  styleUrl: './deals-page.component.scss'
})
export class DealsPageComponent {

  deals: DealCard[] = [];
  page : number = 1;
  limit : number = 5;
  isLoadMoreDisabled : boolean = false;

  constructor(public dealService : DealService) { }

  ngOnInit(): void {
    this.load();
  }

  loadMore() {
    this.page += 1;
    this.load();
  }

  load() {
    this.dealService.getDeals(this.page, this.limit)
    .then(result => {
      this.deals = [...this.deals, ...result.deals];
      if (result.total <= this.deals.length) {
        this.isLoadMoreDisabled = true;
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
}
