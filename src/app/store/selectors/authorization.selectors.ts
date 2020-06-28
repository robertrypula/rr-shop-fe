import { createSelector } from '@ngrx/store';

import * as fromAuthorizationReducers from '../reducers/authorization.reducers';
import { getExpirationTime } from '../../utils/authorization.utils';

import { selectAuthorizationFeature } from './authorization-core.selectors';

export const selectExpirationTime = createSelector(
  selectAuthorizationFeature,
  (authorizationFeature: fromAuthorizationReducers.State): number => getExpirationTime(authorizationFeature.token)
);

export const selectToken = createSelector(
  selectAuthorizationFeature,
  (authorizationFeature: fromAuthorizationReducers.State): string => authorizationFeature.token
);
