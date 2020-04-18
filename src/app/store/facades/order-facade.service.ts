import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromOrderActions from '../actions/order.actions';
import * as fromOrderSelectors from '../selectors/order.selectors';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { selectActiveOrder, selectIsOnOrderRoute, selectUrlOrderUuid } from '../selectors/order.selectors';
import { selectApiCallPromoCode } from '../selectors/order-core.selectors';
import { ApiCall } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class OrderFacadeService {
  public activeOrder$: Observable<Order> = this.store.pipe(select(selectActiveOrder));
  public isOnOrderRoute$: Observable<boolean> = this.store.pipe(select(selectIsOnOrderRoute));
  public isOnPotentialOrderRoute$: Observable<boolean> = this.store.pipe(
    select(fromOrderSelectors.selectIsOnPotentialOrderRoute$)
  );
  public potentialOrderProductsIds$: Observable<number[]> = this.store.pipe(
    select(fromOrderSelectors.selectPotentialOrderProductsIds)
  );
  public urlOrderUuid$: Observable<string> = this.store.pipe(select(selectUrlOrderUuid));

  public constructor(protected store: Store<State>) {}

  public apiCallPromoCode$(): Observable<ApiCall> {
    return this.store.pipe(select(selectApiCallPromoCode));
  }

  public clientDetailsFormByUuid$(uuid: string): Observable<ClientDetailsForm> {
    return this.store.pipe(select(fromOrderSelectors.selectClientDetailsFormByUuid(uuid)));
  }

  public orderByUuid$(uuid: string): Observable<Order> {
    return this.store.pipe(select(fromOrderSelectors.selectOrderByUuid(uuid)));
  }

  public promoCodeTextFieldByUuid$(uuid: string): Observable<string> {
    return this.store.pipe(select(fromOrderSelectors.selectPromoCodeTextFieldByUuid(uuid)));
  }

  // ---------------------------------------------------------------------------

  public add(product: Product): void {
    this.store.dispatch(fromOrderActions.add({ productId: product.id }));
  }

  public chooseDelivery(productId: number): void {
    this.store.dispatch(fromOrderActions.chooseDelivery({ productId }));
  }

  public chooseParcelLocker(parcelLocker: string): void {
    this.store.dispatch(fromOrderActions.chooseParcelLocker({ parcelLocker }));
  }

  public choosePayment(productId: number): void {
    this.store.dispatch(fromOrderActions.choosePayment({ productId }));
  }

  public clientDetailsEdit(): void {
    this.store.dispatch(fromOrderActions.clientDetailsEdit());
  }

  public clientDetailsSave(clientDetailsForm: ClientDetailsForm): void {
    this.store.dispatch(fromOrderActions.clientDetailsSave({ clientDetailsForm }));
  }

  public createOrder(): void {
    this.store.dispatch(fromOrderActions.createOrderRequest());
  }

  public quantityDecrement(orderItemId: number): void {
    this.store.dispatch(fromOrderActions.quantityDecrement({ id: orderItemId }));
  }

  public quantityIncrement(orderItemId: number): void {
    this.store.dispatch(fromOrderActions.quantityIncrement({ id: orderItemId }));
  }

  public remove(orderItemId: number): void {
    this.store.dispatch(fromOrderActions.remove({ id: orderItemId }));
  }

  public setPromoCodeTextField(promoCodeTextField: string): void {
    this.store.dispatch(fromOrderActions.setPromoCodeTextField({ promoCodeTextField }));
  }

  public promoCodeRequest(): void {
    this.store.dispatch(fromOrderActions.promoCodeRequest());
  }

  public promoCodeReset(): void {
    this.store.dispatch(fromOrderActions.promoCodeReset());
  }
}
