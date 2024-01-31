import { Injectable } from '@angular/core';
import { CreateProposal, ProposalDetails } from '../../models/proposal';
import { catchError, map, throwError } from 'rxjs';
import { RestService } from '../rest.service';
import { CustomCurrencyPipe } from '../pipes/custom-currency';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private restService : RestService,
    private customCurrencyPipe : CustomCurrencyPipe) { }

  public create(proposal : CreateProposal) {
    return this.restService.restPOST<boolean>("/Proposal/Create", proposal)
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    ); 
  }

  get(id: number) {
    return this.restService.restGET<ProposalDetails>("/Proposal/Get/" + id)
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      map((proposal: ProposalDetails) => {
        proposal.price = this.customCurrencyPipe.transform(Number(proposal.price));
        return proposal;
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
      }),
      map((proposals: ProposalDetails[]) => {
        proposals.map(proposal => 
          proposal.price = this.customCurrencyPipe.transform(Number(proposal.price))
        );
        return proposals;
      })
    );
  }

  public getByDealId(id : number) {
    return this.restService.restGET<ProposalDetails[]>("/Proposal/GetByDealId", {id : id})
    .pipe(
      catchError(err => {
        return throwError(err);
      }),
      map((proposals: ProposalDetails[]) => {
        proposals.map(proposal => 
          proposal.price = this.customCurrencyPipe.transform(Number(proposal.price))
        );
        return proposals;
      })
    );
  }
}
