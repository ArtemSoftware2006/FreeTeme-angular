import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DealCard, DealCreate, DealDetails } from '../../models/deal';
import { catchError, map, throwError } from 'rxjs';
import { RestService } from '../rest.service';
import { DatePipe } from '@angular/common';
import { CustomCurrencyPipe } from '../pipes/custom-currency';

@Injectable({
  providedIn: 'root',
})
export class DealService {

  constructor(private restService: RestService,
    private datePipe: DatePipe,
    private customCurrencyPipe : CustomCurrencyPipe) { }

  public getDeals(page: number, limit: number, userId : number) {
    return this.restService.restGET<HttpResponse<DealCard[]>>("/Deal/Deals",
      {
        limit: limit,
        page: page,
        userId : userId
      },
      {        
        observe: 'response'
      }
    )
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map((response: HttpResponse<DealCard[]>) => {
          const totalCount = response.headers.get('X-Total-Count');
          const deals = response.body?.map(deal => {
            deal.datePublication = this.datePipe.transform(deal.datePublication, 'dd.MM.yyyy HH:mm:ss') as string;
            deal.minPrice = this.customCurrencyPipe.transform(Number(deal.minPrice));
            deal.maxPrice = this.customCurrencyPipe.transform(Number(deal.maxPrice));
            return deal;
          });

          return { deals: deals, total: totalCount };
        })
      );
  }

  public create(deal: DealCreate) {

    return this.restService.restPOST<DealCreate>(
      "/deal/create",
      deal
    )
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  public get(id: number, userId : number) {
    return this.restService.restGET<DealDetails>("/deal/get/" + id, {userId : userId})
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map((deal: DealDetails) => {
          deal.datePublication = this.datePipe.transform(deal.datePublication, 'dd.MM.yyyy HH:mm:ss') as string;
          deal.minPrice = this.customCurrencyPipe.transform(Number(deal.minPrice));
          deal.maxPrice = this.customCurrencyPipe.transform(Number(deal.maxPrice));

          return deal;
        })
      );
  }

  public getByUserId(id: number) {
    return this.restService.restGET<DealDetails[]>("/deal/getByUserId",
      { id: id  })
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map((deals: DealDetails[]) => {
            deals = deals?.map(deal => {
            deal.datePublication = this.datePipe.transform(deal.datePublication, 'dd.MM.yyyy HH:mm:ss') as string;
            deal.minPrice = this.customCurrencyPipe.transform(Number(deal.minPrice));
            deal.maxPrice = this.customCurrencyPipe.transform(Number(deal.maxPrice));
            return deal;
          });


          return deals;
        })
      );
  }

  public getDelasByTitle(title : string) {
    return this.restService.restGET<DealDetails[]>("/deal/GetByTitle",{title})
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      map((deals: DealDetails[]) => {
        deals = deals?.map(deal => {
          deal.datePublication = this.datePipe.transform(deal.datePublication, 'dd.MM.yyyy HH:mm:ss') as string;
          deal.minPrice = this.customCurrencyPipe.transform(Number(deal.minPrice));
          deal.maxPrice = this.customCurrencyPipe.transform(Number(deal.maxPrice));
          return deal;
        });


        return deals;
      })
    );
  }
}

