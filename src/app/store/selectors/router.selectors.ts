import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromRouterReducers from '../reducers/router.reducers';

// export const selectRouterFeature = (state: State): fromRouterReducers.State => state.router;
export const selectRouterFeature = createFeatureSelector<State, fromRouterReducers.State>('router');

// const {
//   selectQueryParams,    // select the current route query params
//   selectQueryParam,     // factory function to select a query param
//   selectRouteParams,    // select the current route params
//   selectRouteParam,     // factory function to select a route param
//   selectRouteData,      // select the current route data
//   selectUrl,            // select the current url
// } = fromRouter.getSelectors(selectRouterFeature);

export const selectUrl = createSelector(
  selectRouterFeature,
  (routerFeature: fromRouterReducers.State): string => {
    console.log(routerFeature);
    return routerFeature && routerFeature.state.url;
  }
);

// export const selectSelectedCarId = selectQueryParam('carId');

// export const selectCar = createSelector(
//   // selectCarEntities,
//   selectSelectedCarId,
//   (/*cars,*/ carId) => {
//
//     console.log(carId);
//
//     return null;
//   }
// );

// export const selectCarsByColor = createSelector(
//   // selectCarEntities,
//   selectQueryParams,
//   (/*cars,*/ params) => cars.filter(c => c.color === params['color'])
// );
