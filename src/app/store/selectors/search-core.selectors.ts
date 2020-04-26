import { createSelector } from '@ngrx/store';

import { ApiCall } from '../../models/page.model';
import { State } from '../reducers';
import * as fromSearchReducers from '../reducers/search.reducers';

export const selectSearchFeature = (state: State): fromSearchReducers.State => state.search;

export const selectApiCallSearch = createSelector(
  selectSearchFeature,
  (searchFeature: fromSearchReducers.State): ApiCall => searchFeature.apiCallSearch
);

export const selectProductIds = createSelector(
  selectSearchFeature,
  (searchFeature: fromSearchReducers.State): number[] => searchFeature.productIds
);

export const selectQuery = createSelector(
  selectSearchFeature,
  (searchFeature: fromSearchReducers.State): string => searchFeature.query
);
