import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealDetails } from '../../models/deal';
import { DealService } from '../../services/deal/deal.service';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-deal-details-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './deal-details-page.component.html',
  styleUrl: './deal-details-page.component.scss'
})
export class DealDetailsPageComponent {

  deal? : DealDetails;

  constructor(private route: ActivatedRoute,
    public dealService : DealService) { }

  ngOnInit(): void {
    // Получение значения id из параметра маршрута
    const id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.dealService.get(Number(id))
      .then((deal : DealDetails) => {
        this.deal = deal;
        console.log(deal);
      }) 
      .catch((error) => {
        console.log(error);
      })
    }
  }
}
