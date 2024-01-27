import { catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { ProposalDetails } from '../../models/proposal';
import { DealCard } from '../../models/deal';

@Injectable({
  providedIn: 'root'
})
export class ApprovedService {

  constructor(private restService : RestService) { }

  approved(dealId : number, proposalId : number) {
    return this.restService.restPOST("/Approved/ApprovedDeal", 
      null, 
      {params : {
        dealId : dealId, 
        proposalId : proposalId
      }
    })
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getDeals(userId : number) {
    return this.restService.restGET<DealCard[]>("/Approved/GetDeals", {userId : userId})
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getProposals(userId : number) {
    return this.restService.restGET<ProposalDetails[]>("/Approved/GetProposals", {userId : userId})
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
