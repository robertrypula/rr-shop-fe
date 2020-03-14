import { Action, createReducer, on } from '@ngrx/store';

import * as fromOrderActions from '../actions/order.actions';
import { OrderItemStore, OrderStore, Type } from '../../models/order.model';
import { ApiCall } from '../../models/generic.model';

export interface State {
  apiCallCreateOrder: ApiCall;
  apiCallOrder: ApiCall;
  apiCallPotentialOrderProducts: ApiCall;
  entities: {
    [id: number]: OrderStore;
  };
  lastOrderItemId: number;
  lastOrderId: number;
}

export const POTENTIAL_ORDER_ID = -1;

export const initialState: State = {
  apiCallCreateOrder: ApiCall.Initial,
  apiCallOrder: ApiCall.Initial,
  apiCallPotentialOrderProducts: ApiCall.Initial,
  entities: {
    [POTENTIAL_ORDER_ID]: {
      id: POTENTIAL_ORDER_ID,
      uuid: null,
      number: null,
      email: null,
      phone: null,
      name: null,
      surname: null,
      address: null,
      zipCode: null,
      city: null,
      comments: null,
      parcelLocker: null,
      paymentUrl: null,
      // ---
      orderItems: {}
    }
  },
  lastOrderItemId: 0,
  lastOrderId: 0
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
  on(
    fromOrderActions.add,
    (state: State, { productId, quantity }): State => {
      const lastOrderItemId: number = state.lastOrderItemId + 1;

      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_ID]: {
            ...state.entities[POTENTIAL_ORDER_ID],
            orderItems: {
              ...state.entities[POTENTIAL_ORDER_ID].orderItems,
              [lastOrderItemId]: { id: lastOrderItemId, productId, quantity, type: Type.Normal }
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
            orderItems: {
              ...Object.keys(state.entities[POTENTIAL_ORDER_ID].orderItems)
                .filter(
                  (key: string): boolean => state.entities[POTENTIAL_ORDER_ID].orderItems[+key].type !== Type.Delivery
                )
                .reduce(
                  (acc: { [key: string]: OrderItemStore }, curr: string): { [key: string]: OrderItemStore } => (
                    (acc[curr] = state.entities[POTENTIAL_ORDER_ID].orderItems[curr]), acc
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
            orderItems: {
              ...Object.keys(state.entities[POTENTIAL_ORDER_ID].orderItems)
                .filter(
                  (key: string): boolean => state.entities[POTENTIAL_ORDER_ID].orderItems[+key].type !== Type.Payment
                )
                .reduce(
                  (acc: { [key: string]: OrderItemStore }, curr: string): { [key: string]: OrderItemStore } => (
                    (acc[curr] = state.entities[POTENTIAL_ORDER_ID].orderItems[curr]), acc
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
      const orderItemStore: OrderItemStore = state.entities[POTENTIAL_ORDER_ID].orderItems[id];

      return orderItemStore
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_ID]: {
                ...state.entities[POTENTIAL_ORDER_ID],
                orderItems: {
                  ...state.entities[POTENTIAL_ORDER_ID].orderItems,
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
      const orderItemStore: OrderItemStore = state.entities[POTENTIAL_ORDER_ID].orderItems[id];

      return orderItemStore
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_ID]: {
                ...state.entities[POTENTIAL_ORDER_ID],
                orderItems: {
                  ...state.entities[POTENTIAL_ORDER_ID].orderItems,
                  [id]: { ...orderItemStore, quantity: orderItemStore.quantity - 1 }
                }
              }
            }
          }
        : state;
    }
  ),
  on(
    fromOrderActions.quantitySetTo,
    (state: State, { id, quantity }): State => {
      const orderItemStore: OrderItemStore = state.entities[POTENTIAL_ORDER_ID].orderItems[id];

      return orderItemStore
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_ID]: {
                ...state.entities[POTENTIAL_ORDER_ID],
                orderItems: {
                  ...state.entities[POTENTIAL_ORDER_ID].orderItems,
                  [id]: { ...orderItemStore, quantity }
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
      const { [id]: toDelete, ...rest } = state.entities[POTENTIAL_ORDER_ID].orderItems;

      return toDelete
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_ID]: {
                ...state.entities[POTENTIAL_ORDER_ID],
                orderItems: rest
              }
            }
          }
        : state;
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}
