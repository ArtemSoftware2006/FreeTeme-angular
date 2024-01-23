import { UserUpdateProfileRequest } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { UserProfile } from '../../models/user';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restService : RestService, 
    private httpClient : HttpClient) { }

  public getUser(id : number) {
     return this.restService.restGET<UserProfile>( "/User/Get",
          {"id" : id}
      )
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  public updateProfile(UpdateProfile : UserUpdateProfileRequest) {
      return this.restService.restPUT("/User/Update", UpdateProfile)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      )
  }
}
