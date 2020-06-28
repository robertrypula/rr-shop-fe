import { createSelector } from '@ngrx/store';

import * as fromPageReducers from '../reducers/page.reducers';
import { State } from '../reducers';
import { ApiCall } from '../../models/root.model';

export const selectPageFeature = (state: State): fromPageReducers.State => state.page;

export const selectApiCallProductsAtMainPage = createSelector(
  selectPageFeature,
  (pageFeature: fromPageReducers.State): ApiCall => pageFeature.apiCallProductsAtMainPage
);
