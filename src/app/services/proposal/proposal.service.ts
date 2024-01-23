import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProposal, ProposalDetails } from '../../models/proposal';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  readonly BASE_URL = "http://localhost:5202"; 

  constructor(private httpClient : HttpClient) { }

  public create(proposal : CreateProposal) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<boolean>(this.BASE_URL + "/Proposal/Create", proposal)
      .pipe(
        catchError(err => {
          reject(err);
          return throwError(err);
        })
      )
      .subscribe(result => {
        resolve(true);
      },
      (error) => {
        reject(error);
      });
    }); 
  }

  public getByUserId(id : number) {
    return new Promise<ProposalDetails[]>((resolve, reject) => {
      this.httpClient.get<ProposalDetails[]>(this.BASE_URL + "/Proposal/GetByUserId",
      {
        params: {
          userId : id
        }
      })
      .pipe(
        catchError(err => {
          reject(err);
          return throwError(err);
        })
      )
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
      });
    })
  }
}
