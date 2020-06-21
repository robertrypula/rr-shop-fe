import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, first, flatMap, tap } from 'rxjs/operators';

import { AuthorizationFacadeService } from '../../store/facades/authorization-facade.service';

// https://antonyderham.me/post/angular-ngrx-auth-interceptor/

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  public constructor(protected router: Router, protected authorizationFacadeService: AuthorizationFacadeService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authorizationFacadeService.token$.pipe(
      first(),
      flatMap(
        (requestToken: string): Observable<HttpEvent<any>> =>
          next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${requestToken ? requestToken : '-'}` } }))
      ),
      tap((event: HttpEvent<any>): void => {
        if (event instanceof HttpResponse) {
          const responseToken: string = event.headers.get('Authorization');

          if (responseToken) {
            this.authorizationFacadeService.setToken(responseToken);
          }
        }
      }),
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
        console.log(error, caught);

        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authorizationFacadeService.setToken(null);
          this.router.navigate(['/admin']).then();
        }

        return throwError('test');
      })
    );
  }
}
