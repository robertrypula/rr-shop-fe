import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  public static readonly LOCAL_STORAGE_TOKEN_KEY = 'token';

  public constructor(protected router: Router) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = window.localStorage.getItem(AuthInterceptor.LOCAL_STORAGE_TOKEN_KEY) || '-';

    return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(
      tap(
        () => {},
        (error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            window.localStorage.removeItem(AuthInterceptor.LOCAL_STORAGE_TOKEN_KEY);
            this.router.navigate(['/admin']).then();
          }
        }
      )
    );
  }
}
