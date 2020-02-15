import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromRouterReducers from '../reducers/router.reducers';

export const selectRouterFeature = (state: State): fromRouterReducers.State => state.router;

export const selectNavigationId = createSelector(
  selectRouterFeature,
  (routerFeature: fromRouterReducers.State): number => {
    return routerFeature ? routerFeature.navigationId : 0;
  }
);

export const selectUrl = createSelector(selectRouterFeature, (routerFeature: fromRouterReducers.State): string => {
  return routerFeature && routerFeature.state.url;
});
