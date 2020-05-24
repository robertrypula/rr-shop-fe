import { Action, createReducer, on } from '@ngrx/store';

import { OrderItemStore } from '../../models/order-item.model';
import * as fromOrderActions from '../actions/order.actions';
import { OrderEntities, OrderStore } from '../../models/order.model';
import { ApiCall } from '../../models/page.model';
import { Type } from '../../models/product.model';

export interface State {
  apiCallCreateOrder: ApiCall;
  apiCallOrder: ApiCall;
  apiCallPotentialOrderProducts: ApiCall;
  apiCallPromoCode: ApiCall;
  entities: OrderEntities;
  lastOrderItemId: number;
}

export const POTENTIAL_ORDER_UUID = '-1';

const initialEmptyOrder: OrderEntities = {
  [POTENTIAL_ORDER_UUID]: {
    uuid: `${POTENTIAL_ORDER_UUID}`,
    number: null,
    status: null,
    // ---
    isClientDetailsFormActive: true,
    isClientDetailsFormValid: false,
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
    parcelNumber: null,
    promoCodeTextField: '',
    // ---
    isLegalConfirmationChecked: false,
    // ---
    promoCodeStore: null,
    orderItemsStore: {}
  }
};

export const initialState: State = {
  apiCallCreateOrder: ApiCall.Initial,
  apiCallOrder: ApiCall.Initial,
  apiCallPotentialOrderProducts: ApiCall.Initial,
  apiCallPromoCode: ApiCall.Initial,
  entities: {
    ...initialEmptyOrder
  },
  lastOrderItemId: 0
};

const orderReducer = createReducer(
  initialState,
  on(fromOrderActions.createOrderRequest, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Request })),
  on(fromOrderActions.createOrderSuccess, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Success })),
  on(fromOrderActions.createOrderFailure, (state: State): State => ({ ...state, apiCallCreateOrder: ApiCall.Failure })),
  on(fromOrderActions.orderRequest, (state: State): State => ({ ...state, apiCallOrder: ApiCall.Request })),
  on(
    fromOrderActions.orderSuccess,
    (state: State, { orderStore }): State => ({
      ...state,
      apiCallOrder: ApiCall.Success,
      entities: {
        ...state.entities,
        [orderStore.uuid]: orderStore
      }
    })
  ),
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
        [POTENTIAL_ORDER_UUID]: {
          ...state.entities[POTENTIAL_ORDER_UUID],
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
        [POTENTIAL_ORDER_UUID]: {
          ...state.entities[POTENTIAL_ORDER_UUID],
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
        [POTENTIAL_ORDER_UUID]: {
          ...state.entities[POTENTIAL_ORDER_UUID],
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
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            orderItemsStore: {
              ...state.entities[POTENTIAL_ORDER_UUID].orderItemsStore,
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
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            orderItemsStore: {
              ...Object.keys(state.entities[POTENTIAL_ORDER_UUID].orderItemsStore)
                .filter(
                  (key: string): boolean =>
                    state.entities[POTENTIAL_ORDER_UUID].orderItemsStore[+key].type !== Type.Delivery
                )
                .reduce(
                  (acc: { [key: string]: OrderItemStore }, curr: string): { [key: string]: OrderItemStore } => (
                    (acc[curr] = state.entities[POTENTIAL_ORDER_UUID].orderItemsStore[curr]), acc
                  ),
                  {}
                ),
              [lastOrderItemId]: { id: lastOrderItemId, productId, quantity: 1, type: Type.Delivery }
            },
            parcelLocker: null
          }
        },
        lastOrderItemId
      };
    }
  ),
  on(
    fromOrderActions.chooseParcelLocker,
    (state: State, { parcelLocker }): State => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            parcelLocker
          }
        }
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
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            orderItemsStore: {
              ...Object.keys(state.entities[POTENTIAL_ORDER_UUID].orderItemsStore)
                .filter(
                  (key: string): boolean =>
                    state.entities[POTENTIAL_ORDER_UUID].orderItemsStore[+key].type !== Type.Payment
                )
                .reduce(
                  (acc: { [key: string]: OrderItemStore }, curr: string): { [key: string]: OrderItemStore } => (
                    (acc[curr] = state.entities[POTENTIAL_ORDER_UUID].orderItemsStore[curr]), acc
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
    fromOrderActions.clientDetailsEdit,
    (state: State): State => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            isClientDetailsFormActive: true,
            isClientDetailsFormValid: false
          }
        }
      };
    }
  ),
  on(
    fromOrderActions.clientDetailsSave,
    (state: State, { clientDetailsForm }): State => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            ...clientDetailsForm
          }
        }
      };
    }
  ),
  on(
    fromOrderActions.quantityIncrement,
    (state: State, { id }): State => {
      const orderItemStore: OrderItemStore = state.entities[POTENTIAL_ORDER_UUID].orderItemsStore[id];

      return orderItemStore
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_UUID]: {
                ...state.entities[POTENTIAL_ORDER_UUID],
                orderItemsStore: {
                  ...state.entities[POTENTIAL_ORDER_UUID].orderItemsStore,
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
      const orderItemStore: OrderItemStore = state.entities[POTENTIAL_ORDER_UUID].orderItemsStore[id];

      return orderItemStore
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_UUID]: {
                ...state.entities[POTENTIAL_ORDER_UUID],
                orderItemsStore: {
                  ...state.entities[POTENTIAL_ORDER_UUID].orderItemsStore,
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
      const { [id]: toDelete, ...rest } = state.entities[POTENTIAL_ORDER_UUID].orderItemsStore;

      return toDelete
        ? {
            ...state,
            entities: {
              ...state.entities,
              [POTENTIAL_ORDER_UUID]: {
                ...state.entities[POTENTIAL_ORDER_UUID],
                orderItemsStore: rest
              }
            }
          }
        : state;
    }
  ),
  on(
    fromOrderActions.resetOrders,
    (state: State): State => {
      return {
        ...state,
        entities: {
          ...initialEmptyOrder
        }
      };
    }
  ),
  on(
    fromOrderActions.setPromoCodeTextField,
    (state: State, { promoCodeTextField }): State => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            promoCodeTextField
          }
        }
      };
    }
  ),
  on(
    fromOrderActions.syncOrderLocalStorage,
    (state: State, { orderLocalStorage }): State => {
      return {
        ...state,
        entities: {
          ...orderLocalStorage.entities
        },
        lastOrderItemId: orderLocalStorage.lastOrderItemId
      };
    }
  ),
  on(
    fromOrderActions.toggleLegalConfirmation,
    (state: State): State => {
      return {
        ...state,
        entities: {
          ...state.entities,
          [POTENTIAL_ORDER_UUID]: {
            ...state.entities[POTENTIAL_ORDER_UUID],
            isLegalConfirmationChecked: !state.entities[POTENTIAL_ORDER_UUID].isLegalConfirmationChecked
          }
        }
      };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}
