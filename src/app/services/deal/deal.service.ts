import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deal, DealCard, DealCreate } from '../../models/deal';
import { catchError, map, throwError } from 'rxjs';
import { DealCardsHttpResult } from '../../models/httpResult';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  public BASE_URL = 'http://localhost:5202'

  constructor(private httpClient : HttpClient) { }

   public getDeals(page : number, limit : number) {
    return new Promise<DealCardsHttpResult>((resolve, reject) => {
      this.httpClient.get<DealCard[]>(
        this.BASE_URL + "/Deal/Deals",
        {
          params: {
            limit : limit,
            page : page
          },
          observe: 'response'
        }
      )
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map((response : HttpResponse<DealCard[]>) => {
          const totalCount = response.headers.get('X-Total-Count');
  
          return {deals : response.body, total : totalCount}; 
        })
      )
      .subscribe(result => {
        resolve( {deals : result.deals || [], total : Number(result.total) });
      }, (error) => {
        reject(error);
      });
    });
  }

  public create(deal : DealCreate) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<DealCreate>(
        this.BASE_URL + "/deal/create",
        deal
      )
      .pipe(
        catchError(err => {

          if (err.status === 401) {
            reject(err);
          }

          return throwError(err);
        }),
        map((deal: any) => {
          resolve(true);
        })
      )
      .subscribe((result) => {
        resolve(true);
      }, (error) => {
        reject(error);
      });
    }); 
  }
}
