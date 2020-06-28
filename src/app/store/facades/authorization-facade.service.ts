import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuthorizationActions from '../actions/authorization.actions';
import * as fromAuthorizationSelectors from '../selectors/authorization.selectors';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationFacadeService {
  public expirationTime$: Observable<number> = this.store.pipe(select(fromAuthorizationSelectors.selectExpirationTime));
  public token$: Observable<string> = this.store.pipe(select(fromAuthorizationSelectors.selectToken));

  public constructor(protected store: Store<State>) {}

  public setToken(token: string): void {
    this.store.dispatch(fromAuthorizationActions.setToken({ token }));
  }
}
