import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { IToken } from '../../models/token';
import { User } from '../../models/user';
import { JwtDecoderService } from '../jwt-decoder/jwt-decoder.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
    readonly BASE_URL = 'http://localhost:5202';
    private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    constructor(
        private httpClient: HttpClient,
        private jwtDecoder: JwtDecoderService
    ) {
    }

    /*
    * 1. Критично. Не нужно использовать Promise, так как HttpClient возвращает Observable. Observable - это по-сути база RxJS и Angular в целом.
    *    Observable сильнее и гибче, чем Promise, не нужно оборачивать в Promise (без особой необходимости).
    * 2. Не критично. Тут можно (и так даже будет лучше) добавить сервис для работы с http запросами. Я добавлю пример RestService, чтобы было понятнее.
    * */
    public login(login: string, password: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.httpClient.post<IToken>(
                this.BASE_URL + '/User/Login',
                {login, password}
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

    // Передавай сюда объект с определенным интерфейсом, а не 4 аргумента и так везде
    public registration(login: string, password: string, passwordConfirm: string, email: string) {
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
                // все подписки будут в компоненте, который использует этот сервис
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
