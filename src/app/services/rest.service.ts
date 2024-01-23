import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type GET_PARAMS = {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> | any; 
};

@Injectable({
    providedIn: 'root'
})
export class RestService {
    readonly BASE_URL = 'http://localhost:5202';

    constructor(
        private _http: HttpClient,
    ) {
    }

    public restGET<T>(endpoint: string, params: GET_PARAMS = {}, options : HttpOptions = {}): Observable<T> {
        return this.request('GET', this.BASE_URL + endpoint, {
            params: new HttpParams({
                fromObject: params
            })
        }, 
        options);
    }

    public restPOST<T>(endpoint: string, body: object | null = null): Observable<T> {
        return this.request('POST', this.BASE_URL + endpoint, {
            body : {...body}
        });
    }

    public request<T>(method: string, endpoint: string, body: any, options: HttpOptions = {}): Observable<T> {
        const context = new HttpContext();
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        const httpOptions: HttpOptions = {
            ...options,
            ...body,
            headers : headers,
            context : context,
        };

        console.log(httpOptions);

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
