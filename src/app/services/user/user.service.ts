import { UserUpdateProfileRequest } from './../../models/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { UserProfile } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public BASE_URL = 'http://localhost:5202'

  constructor(private httpClient : HttpClient) { }

  public getUser(id : number) {
    return new Promise<UserProfile>((resolve, reject) => {
      this.httpClient.get<UserProfile>(
        this.BASE_URL + "/User/Get",
        {
          params: {
            "id" : id
          }
        }
      )
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map((response : UserProfile) => {
          return response; 
        })
      )
      .subscribe(result => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  public updateProfile(UpdateProfile : UserUpdateProfileRequest) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.put(this.BASE_URL + "/User/Update", UpdateProfile)
      .pipe(
        catchError(err => {
          reject(err);
          return throwError(err);
        })
      )
      .subscribe(result => {
        resolve(true);
      }, (error) => {
        reject(error);
      });
    })
  }
}
