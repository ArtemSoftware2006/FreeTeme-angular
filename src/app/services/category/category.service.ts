import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
import { catchError, throwError } from 'rxjs';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private restService : RestService) 
  { }

  getCategories() {
    return this.restService.restGET<Category[]>('/Category/GetCategories')
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    )
  }
}
