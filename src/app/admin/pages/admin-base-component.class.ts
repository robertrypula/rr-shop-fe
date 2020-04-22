import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AdminCallState, AdminCall } from '../models/admin-component.models';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Injectable()
export class AdminBaseComponent {
  public readonly AdminCallState = AdminCallState;

  public constructor(
    protected http: HttpClient,
    protected route: ActivatedRoute,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  protected getAdminCall<T>(): AdminCall<T> {
    return {
      adminCallState: AdminCallState.Initial,
      data: null,
      errorDetails: null
    };
  }

  protected get<T>(adminCall: AdminCall<T>, path: string): Observable<T> {
    adminCall.adminCallState = AdminCallState.Request;
    adminCall.errorDetails = null;

    return this.http.get<T>(`${environment.urlApi}admin/${path}`).pipe(
      tap(
        (data: T): void => {
          adminCall.adminCallState = AdminCallState.Success;
          adminCall.data = data;
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.changeDetectorRef.markForCheck();
        }
      )
    );
  }

  protected post<T, U>(adminCall: AdminCall<T>, path: string, body: U): Observable<T> {
    adminCall.adminCallState = AdminCallState.Request;
    adminCall.errorDetails = null;

    return this.http.post<T>(`${environment.urlApi}admin/${path}`, body).pipe(
      tap(
        (data: T): void => {
          adminCall.adminCallState = AdminCallState.Success;
          adminCall.data = data;
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.changeDetectorRef.markForCheck();
        }
      )
    );
  }

  protected patch<T, U>(adminCall: AdminCall<T>, path: string, body: U): Observable<T> {
    adminCall.adminCallState = AdminCallState.Request;
    adminCall.errorDetails = null;

    return this.http.patch<T>(`${environment.urlApi}admin/${path}`, body).pipe(
      tap(
        (data: T): void => {
          adminCall.adminCallState = AdminCallState.Success;
          adminCall.data = data;
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.changeDetectorRef.markForCheck();
        }
      )
    );
  }

  protected delete<T>(adminCall: AdminCall<T>, path: string): Observable<T> {
    adminCall.adminCallState = AdminCallState.Request;
    adminCall.errorDetails = null;

    return this.http.delete<T>(`${environment.urlApi}admin/${path}`).pipe(
      tap(
        (data: T): void => {
          adminCall.adminCallState = AdminCallState.Success;
          adminCall.data = data;
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.changeDetectorRef.markForCheck();
        }
      )
    );
  }
}
