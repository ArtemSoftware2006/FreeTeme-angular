import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly BASE_URL = 'http://localhost:5202';

  constructor(private httpClient : HttpClient) 
  { }

  getCategories() {
    return new Promise<Category[]>((resolve, reject) => {
      this.httpClient.get<Category[]>(this.BASE_URL + '/Category/GetCategories')
      .pipe(
        catchError(err => {
          reject(err);
          return throwError(err);
        })
      )
      .subscribe(result => {
        resolve(result);
      },
      (error) => {
        reject(error);
      });
    });
  }
}
