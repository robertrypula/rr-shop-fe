import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

/**
 * It's not following any of the best practices but I wrote this Admin in 1 hour :)
 * TODO refactor it when complexity increase
 */

@Injectable()
export class AdminBaseComponent {
  public data: any;
  public isLoading = false;
  public isError = false;

  public constructor(protected http: HttpClient, protected route: ActivatedRoute) {}

  protected load(path): void {
    this.isLoading = true;
    this.isError = false;
    this.http
      .get<any>(`${environment.urlApi}admin/${path}`)
      .pipe(
        tap(
          (data: any): void => {
            this.isLoading = false;
            this.data = data;
          },
          (error: any): void => {
            this.isLoading = false;
            this.isError = true;
          }
        )
      )
      .subscribe();
  }
}
