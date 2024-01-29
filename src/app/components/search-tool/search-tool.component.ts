import { Component, EventEmitter, Output } from '@angular/core';
import { DealDetails } from '../../models/deal';
import { DealService } from '../../services/deal/deal.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-tool',
  standalone: true,
  imports: [],
  templateUrl: './search-tool.component.html',
  styleUrl: './search-tool.component.scss'
})
export class SearchToolComponent {

  @Output() searched = new EventEmitter<DealDetails[]>();
  @Output() emptySearch = new EventEmitter<boolean>();
  deals : DealDetails[] = [];
  private searchSubject = new Subject<string>();

  constructor(public dealService : DealService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(1000), 
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.dealService.getDelasByTitle(searchText).subscribe(deals => {
        deals = deals.filter(deal => deal.status === 0);
        this.deals = deals;
        this.searched.emit(this.deals);
      });
    });
  }

  search(title: string) {
    if (title != '') {
      this.searchSubject.next(title);      
    } else {
      this.emptySearch.emit(true);
    }
  }
}
