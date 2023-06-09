import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            console.log(error);
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401: //login
                if (!this.router.url.includes('auth'))
                  this.router.navigateByUrl('/auth/signin');
                break;
              case 403: //forbidden
                if (!this.router.url.includes('auth'))
                  this.router.navigateByUrl('/auth/signin');
                break;
            }
          }
        } else {
          console.error('some thing else happened');
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
