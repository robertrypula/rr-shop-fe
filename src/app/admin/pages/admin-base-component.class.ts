import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AdminCall, AdminCallState } from '../models/admin-component.models';
import { BarFacadeService } from '../../store/facades/bar-facade.service';
import { BarType } from '../../models/bar.model';
import { BarService } from '../../services/bar.service';
import { ClickableActionTheme, ClickableActionType } from '../../components/clickable-action/clickable-action.model';
import { environment } from '../../../environments/environment';
import { IconType } from '../../components/icon/icon.models';
import { SizeImage, SizeImageContainer } from '../../models/image.model';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Injectable()
export class AdminBaseComponent {
  public readonly AdminCallState = AdminCallState;
  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;
  public readonly SizeImage = SizeImage;
  public readonly SizeImageContainer = SizeImageContainer;

  public constructor(
    protected barFacadeService: BarFacadeService,
    protected barService: BarService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected http: HttpClient,
    protected route: ActivatedRoute,
    protected router: Router
  ) {}

  protected getAdminCall<T>(data: T = null): AdminCall<T> {
    return {
      adminCallState: AdminCallState.Initial,
      data: data ? data : null,
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
          this.barService.showSuccess('Pobieranie danych zakończone sukcesem :)');
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.barFacadeService.show(
            `Wystąpił błąd przy pobieraniu danych... :(${this.formatError(adminCall.errorDetails)}`,
            BarType.Error
          );
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
          this.barService.showSuccess('Tworzenie nowego obiektu zakończone sukcesem :)');
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.barFacadeService.show(
            `Wystąpił błąd przy tworzeniu nowego obiektu... :(${this.formatError(adminCall.errorDetails)}`,
            BarType.Error
          );
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
          this.barService.showSuccess('Modyfikacja obiektu zakończona sukcesem :)');
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.barFacadeService.show(
            `Wystąpił błąd przy modyfikacji obiektu... :(${this.formatError(adminCall.errorDetails)}`,
            BarType.Error
          );
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
          this.barService.showSuccess('Kasowanie obiektu zakończone sukcesem :)');
          this.changeDetectorRef.markForCheck();
        },
        (error: any): void => {
          adminCall.adminCallState = AdminCallState.Failure;
          adminCall.errorDetails = error && error.error ? error.error : null;
          this.barFacadeService.show(
            `Wystąpił błąd przy kasowaniu obiektu... :(${this.formatError(adminCall.errorDetails)}`,
            BarType.Error
          );
          this.changeDetectorRef.markForCheck();
        }
      )
    );
  }

  protected formatError(error: any): string {
    return '\n\n' + JSON.stringify(error, null, 2);
  }

  protected getSessionStorageKey(key: string, fallback: any = null): any {
    return window.sessionStorage.getItem(key) ? window.sessionStorage.getItem(key) : fallback;
  }

  protected setSessionStorageKey(key: string, value: any): void {
    window.sessionStorage.setItem(key, value);
  }
}
