import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type GET_PARAMS = {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
};

@Injectable({
    providedIn: 'root'
})
export class RestService {
    readonly BASE_URL = 'http://localhost:5202/';

    constructor(
        private _http: HttpClient,
    ) {
    }

    public restGET<T>(endpoint: string, params: GET_PARAMS = {}): Observable<T> {
        return this.request('GET', this.BASE_URL + endpoint, {
            params: new HttpParams({
                fromObject: params
            })
        });
    }

    public restPOST<T>(endpoint: string, body: object | null = null): Observable<T> {
        return this.request('POST', this.BASE_URL + endpoint, {
            ...body
        });
    }

    public request<T>(method: string, endpoint: string, body: any): Observable<T> {
        const context = new HttpContext()

        const httpOptions: HttpOptions = {
            ...body,
            context,
        };

        return this._http.request(method, endpoint, httpOptions);
    }

}


interface HttpOptions {
    body?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body' | 'response';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    responseType?: 'json' | 'blob';
    reportProgress?: boolean;
}

// Пример использования в сервисе
// import { Injectable } from '@angular/core';
// import { RestService } from 'projects/core/src/public-api';
//
// @Injectable({
//     providedIn: 'root'
// })
// export class UserService {
//     constructor(
//         private _rest: RestService
//     ) {
//     }
//
//     public getUser(id: number) {
//         return this._rest.restGET<User>(`user/${id}`);
//     }
// }
