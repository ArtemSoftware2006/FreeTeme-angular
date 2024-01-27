import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { IToken } from '../../models/token';
import { LoginModel, RegisterModel, User } from '../../models/user';
import { JwtDecoderService } from '../jwt-decoder/jwt-decoder.service';
import { RestService } from '../rest.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

  private user : BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null); 

  constructor(
    private jwtDecoder : JwtDecoderService,
    private restService : RestService) 
    {
      if (localStorage.getItem('token')) {
        this.setSession({ token : localStorage.getItem('token')! });
      }
    }
    /*
    * 1. Критично. Не нужно использовать Promise, так как HttpClient возвращает Observable. Observable - это по-сути база RxJS и Angular в целом.
    *    Observable сильнее и гибче, чем Promise, не нужно оборачивать в Promise (без особой необходимости).
    * 2. Не критично. Тут можно (и так даже будет лучше) добавить сервис для работы с http запросами. Я добавлю пример RestService, чтобы было понятнее.
    * */
    public login(model : LoginModel) {
        return this.restService.restPOST<IToken>('/User/Login', model)
        .pipe(
            catchError(err => {
                console.log(err);
                return throwError(err);
            }),
            map((authResult: IToken) => {
                this.setSession(authResult);
                return true;
            })
        );
    }

    // Передавай сюда объект с определенным интерфейсом, а не 4 аргумента и так везде
    public registration(model : RegisterModel) {
        return this.restService.restPOST<IToken>('/User/Register', model)
        .pipe(
            catchError(err => {
                return throwError(err);
            }),
            map((authResult: IToken) => {
                this.setSession(authResult);
                return true; 
            })
        );
    }

    setSession(authResult: IToken) {
        localStorage.setItem('token', authResult.token);
        
        const user = this.jwtDecoder.parse(authResult.token);

        this.user.next(user);
    }

    getUser() {
        return this.user;
    }

    logout() {
        this.user.next(null);
        localStorage.clear();
    }
}
