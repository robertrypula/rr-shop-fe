import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { ApiCall } from '../../models/root.model';
import * as fromSearchReducers from '../reducers/search.reducers';

export const selectSearchFeature = (state: State): fromSearchReducers.State => state.search;

export const selectApiCallSearch = createSelector(
  selectSearchFeature,
  (searchFeature: fromSearchReducers.State): ApiCall => searchFeature.apiCallSearch
);

export const selectFoundProductIds = createSelector(
  selectSearchFeature,
  (searchFeature: fromSearchReducers.State): number[] => searchFeature.foundProductIds
);

export const selectQuery = createSelector(
  selectSearchFeature,
  (searchFeature: fromSearchReducers.State): string => searchFeature.query
);
