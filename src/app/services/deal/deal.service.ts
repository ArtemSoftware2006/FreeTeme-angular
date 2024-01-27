import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DealCard, DealCreate, DealDetails } from '../../models/deal';
import { catchError, map, throwError } from 'rxjs';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class DealService {


  constructor(private restService: RestService) { }

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
          console.log(response);
          const totalCount = response.headers.get('X-Total-Count');

          return { deals: response.body, total: totalCount };
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
        })
      );
  }

  public getByUserId(id: number) {
    return this.restService.restGET<DealDetails[]>("/deal/getByUserId",
      { id: id  })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  public getDelasByTitle(title : string) {
    return this.restService.restGET<DealDetails[]>("/deal/GetByTitle",{title})
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}

