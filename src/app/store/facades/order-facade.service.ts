import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../reducers';
import * as fromOrderActions from '../actions/order.actions';

@Injectable({
  providedIn: 'root'
})
export class OrderFacadeService {
  public constructor(protected store: Store<State>) {}

  public createOrder(): void {
    this.store.dispatch(fromOrderActions.createOrderRequest());
  }
}
