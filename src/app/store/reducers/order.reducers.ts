import { Action, createReducer, on } from '@ngrx/store';

import * as fromOrderActions from '../actions/order.actions';
import { OrderStore } from '../../models/order.model';
import { ApiCall } from '../../models/page.model';
import { OrderItemStore, Type } from '../../models/order-item.model';

export interface State {
  apiCallCreateOrder: ApiCall;
  apiCallOrder: ApiCall;
  apiCallPotentialOrderProducts: ApiCall;
  apiCallPromoCode: ApiCall;
  entities: {
    [id: number]: OrderStore;
  };
  lastOrderItemId: number;
}

export const POTENTIAL_ORDER_ID = -1;

export const initialState: State = {
  apiCallCreateOrder: ApiCall.Initial,
  apiCallOrder: ApiCall.Initial,
  apiCallPotentialOrderProducts: ApiCall.Initial,
  apiCallPromoCode: ApiCall.Initial,
  entities: {
    [POTENTIAL_ORDER_ID]: {
      uuid: `${POTENTIAL_ORDER_ID}`,
      number: null,
      status: null,
      // ---
      email: null,
      phone: null,
      name: null,
      surname: null,
      address: null,
      zipCode: null,
      city: null,
      comments: null,
      // ---
      parcelLocker: null,
      paymentUrl: null,
      // ---
      promoCodeTextField: '',
      promoCodeStore: null,
      orderItemsStore: {}
    }
  },
  lastOrderItemId: 0
};

const orderReducer = createReducer(
  initialState,
  on(fromOrderActions.createOrderRequest, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Request })),
  on(fromOrderActions.createOrderSuccess, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Success })),
  on(fromOrderActions.createOrderFailure, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Failure })),
  on(fromOrderActions.orderRequest, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Request })),
  on(fromOrderActions.orderSuccess, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Success })),
  on(fromOrderActions.orderFailure, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Failure })),
  on(
    fromOrderActions.potentialOrderProductsRequest,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Request })
  ),
  on(
    fromOrderActions.potentialOrderProductsSuccess,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Success })
  ),
  on(
    fromOrderActions.potentialOrderProductsFailure,
    (state: State): State => ({ ...state, apiCallPotentialOrderProducts: ApiCall.Failure })
  ),
  on(fromOrderActions.promoCodeRequest, (state: State): State => ({ ...state, apiCallPromoCode: ApiCall.Request })),
  on(
    fromOrderActions.promoCodeReset,
    (state: State): State => ({
      ...state,
      apiCallPromoCode: ApiCall.Initial,
      entities: {
        ...state.entities,
        [POTENTIAL_ORDER_ID]: {
          ...state.entities[POTENTIAL_ORDER_ID],
          promoCodeTextField: '',
          promoCodeStore: null
        }
      }
    })
  ),
  on(
    fromOrderActions.promoCodeSuccess,
    (state: State, { promoCodeStore }): State => ({
      ...state,
      apiCallPromoCode: ApiCall.Success,
      entities: {
        ...state.entities,
        [POTENTIAL_ORDER_ID]: {
          ...state.entities[POTENTIAL_ORDER_ID],
          promoCodeStore
        }
      }
    })
  ),
  on(
    fromOrderActions.promoCodeFailure,
    (state: State): State => ({
      ...state,
      apiCallPromoCode: ApiCall.Failure,
      entities: {
        ...state.entities,
        [POTENTIAL_ORDER_ID]: {
          ...state.entities[POTENTIAL_ORDER_ID],
          promoCodeStore: null
        }
      }
    })
  ),
  on(
    fromOrderActions.add,
    (state: State, { productId }): State => {
      const lastOrderItemId: number = state.lastOrderItemId + 1;

      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_ID]: {
            ...state.entities[POTENTIAL_ORDER_ID],
            orderItemsStore: {
              ...state.entities[POTENTIAL_ORDER_ID].orderItemsStore,
              [lastOrderItemId]: { id: lastOrderItemId, productId, quantity: 1, type: Type.Product }
            }
          }
        },
        lastOrderItemId
      };
    }
  ),
  on(
    fromOrderActions.chooseDelivery,
    (state: State, { productId }): State => {
      const lastOrderItemId: number = state.lastOrderItemId + 1;

      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_ID]: {
            ...state.entities[POTENTIAL_ORDER_ID],
            orderItemsStore: {
              ...Object.keys(state.entities[POTENTIAL_ORDER_ID].orderItemsStore)
                .filter(
                  (key: string): boolean =>
                    state.entities[POTENTIAL_ORDER_ID].orderItemsStore[+key].type !== Type.Delivery
                )
                .reduce(
                  (acc: { [key: string]: OrderItemStore }, curr: string): { [key: string]: OrderItemStore } => (
                    (acc[curr] = state.entities[POTENTIAL_ORDER_ID].orderItemsStore[curr]), acc
                  ),
                  {}
                ),
              [lastOrderItemId]: { id: lastOrderItemId, productId, quantity: 1, type: Type.Delivery }
            }
          }
        },
        lastOrderItemId
      };
    }
  ),
  on(
    fromOrderActions.choosePayment,
    (state: State, { productId }): State => {
      const lastOrderItemId: number = state.lastOrderItemId + 1;

      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_ID]: {
            ...state.entities[POTENTIAL_ORDER_ID],
            orderItemsStore: {
              ...Object.keys(state.entities[POTENTIAL_ORDER_ID].orderItemsStore)
                .filter(
                  (key: string): boolean =>
                    state.entities[POTENTIAL_ORDER_ID].orderItemsStore[+key].type !== Type.Payment
                )
                .reduce(
                  (acc: { [key: string]: OrderItemStore }, curr: string): { [key: string]: OrderItemStore } => (
                    (acc[curr] = state.entities[POTENTIAL_ORDER_ID].orderItemsStore[curr]), acc
                  ),
                  {}
                ),
              [lastOrderItemId]: { id: lastOrderItemId, productId, quantity: 1, type: Type.Payment }
            }
          }
        },
        lastOrderItemId
      };
    }
  ),
  on(
    fromOrderActions.quantityIncrement,
    (state: State, { id }): State => {
      const orderItemStore: OrderItemStore = state.entities[POTENTIAL_ORDER_ID].orderItemsStore[id];

      return orderItemStore
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_ID]: {
                ...state.entities[POTENTIAL_ORDER_ID],
                orderItemsStore: {
                  ...state.entities[POTENTIAL_ORDER_ID].orderItemsStore,
                  [id]: { ...orderItemStore, quantity: orderItemStore.quantity + 1 }
                }
              }
            }
          }
        : state;
    }
  ),
  on(
    fromOrderActions.quantityDecrement,
    (state: State, { id }): State => {
      const orderItemStore: OrderItemStore = state.entities[POTENTIAL_ORDER_ID].orderItemsStore[id];

      return orderItemStore
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_ID]: {
                ...state.entities[POTENTIAL_ORDER_ID],
                orderItemsStore: {
                  ...state.entities[POTENTIAL_ORDER_ID].orderItemsStore,
                  [id]: { ...orderItemStore, quantity: orderItemStore.quantity - 1 }
                }
              }
            }
          }
        : state;
    }
  ),
  on(
    fromOrderActions.remove,
    (state: State, { id }): State => {
      const { [id]: toDelete, ...rest } = state.entities[POTENTIAL_ORDER_ID].orderItemsStore;

      return toDelete
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_ID]: {
                ...state.entities[POTENTIAL_ORDER_ID],
                orderItemsStore: rest
              }
            }
          }
        : state;
    }
  ),
  on(
    fromOrderActions.setPromoCodeTextField,
    (state: State, { promoCodeTextField }): State => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_ID]: {
            ...state.entities[POTENTIAL_ORDER_ID],
            promoCodeTextField
          }
        }
      };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}
