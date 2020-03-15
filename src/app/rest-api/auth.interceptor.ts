import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  public constructor(protected router: Router) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${'test'}` } })).pipe(
      tap(
        () => {},
        (error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.router.navigate(['/admin']).then();
          }
        }
      )
    );
  }
}
