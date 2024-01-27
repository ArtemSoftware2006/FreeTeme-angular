import { Injectable } from '@angular/core';
import { CreateProposal, ProposalDetails } from '../../models/proposal';
import { catchError, throwError } from 'rxjs';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private restService : RestService) { }

  public create(proposal : CreateProposal) {
    return this.restService.restPOST<boolean>("/Proposal/Create", proposal)
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    ); 
  }

  public getByUserId(id : number) {
    return this.restService.restGET<ProposalDetails[]>("/Proposal/GetByUserId",
    {
      userId : id
    })
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getByDealId(id : number) {
    return this.restService.restGET<ProposalDetails[]>("/Proposal/GetByDealId", {id : id})
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
