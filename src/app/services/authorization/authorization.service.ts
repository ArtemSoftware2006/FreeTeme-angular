import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { IToken } from '../../models/token';
import { IUser } from '../../models/user';
import { JwtDecoderService } from '../jwt-decoder/jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  readonly BASE_URL = 'http://localhost:5202';
  private user : BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null); 

  constructor(private httpClient : HttpClient,
    private jwtDecoder : JwtDecoderService) {}

  public login(login : string, password : string) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<IToken>(
        this.BASE_URL + '/User/Login',
        { login, password }
      ).pipe(
        catchError(err => {
          console.log(err);
          if (err.status === 403) {
            resolve(false); // возвращает false в случае ошибки 403
          }
          return throwError(err);
        }),
        map((authResult: IToken) => {
          this.setSession(authResult);
          return true; // возвращает true в случае успешной авторизации
        })
      ).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  } 

  public registration(login : string, password : string, passwordConfirm : string, email : string) {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<IToken>(
        this.BASE_URL + '/User/Register',
        {login, email, password, passwordConfirm}
      ).pipe(
        catchError(err => {
          if (err.status === 403) {
            resolve(false); // возвращает false в случае ошибки 403
          }
          return throwError(err);
        }),
        map((authResult: IToken) => {
          this.setSession(authResult);
          return true; // возвращает true в случае успешной авторизации
        })
      ).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    }); 
  } 
  setSession(authResult: IToken) {
    const user = this.jwtDecoder.parse(authResult.token);

    this.user.next(user);

    localStorage.setItem('token', authResult.token);
  }

  getUser() {
    return this.user;
  }
}
