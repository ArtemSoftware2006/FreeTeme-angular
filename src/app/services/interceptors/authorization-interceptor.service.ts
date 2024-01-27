import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthorizationService,
    private router : Router ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let request = req;
    if (token) {
      request = req.clone({
        headers : req.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Вызовите метод logout из вашего сервиса
          this.router.navigate(['/login']);
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
