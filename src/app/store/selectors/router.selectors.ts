import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromRouterReducers from '../reducers/router.reducers';
import { featureKey } from '../reducers/router.reducers';

export const selectRouterFeature = (state: State): fromRouterReducers.State => state[featureKey];

export const selectUrl = createSelector(selectRouterFeature, (routerFeature: fromRouterReducers.State): string => {
  console.log(routerFeature);
  return routerFeature && routerFeature.state.url;
});
