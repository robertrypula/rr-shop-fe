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
import { Observable } from 'rxjs';
import { first, flatMap, tap } from 'rxjs/operators';

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
      tap(
        (event: HttpEvent<any>): void => {
          if (event instanceof HttpResponse) {
            const responseToken: string = event.headers.get('Authorization');

            if (responseToken) {
              this.authorizationFacadeService.setToken(responseToken);
            }
          }
        },
        (error: any): void => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.authorizationFacadeService.setToken(null);
            this.router.navigate(['/admin']).then();
          }
        }
      )
    );
  }
}
