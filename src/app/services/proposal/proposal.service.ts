import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProposal } from '../../models/proposal';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  readonly BASE_URL = "http://localhost:5202"; 

  constructor(private httpClient : HttpClient) { }

  create(proposal : CreateProposal) {
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
}
