import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromOrderActions from '../actions/order.actions';
import { selectIsOnOrderRoute, selectUrlOrderUuid } from '../selectors/order.selectors';

@Injectable({
  providedIn: 'root'
})
export class OrderFacadeService {
  public isOnOrderRoute$: Observable<boolean> = this.store.pipe(select(selectIsOnOrderRoute));
  public urlOrderUuid$: Observable<string> = this.store.pipe(select(selectUrlOrderUuid));

  public constructor(protected store: Store<State>) {}

  public createOrder(): void {
    this.store.dispatch(fromOrderActions.createOrderRequest());
  }
}
