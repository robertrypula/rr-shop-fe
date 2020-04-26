import { createSelector } from '@ngrx/store';

import { ApiCall } from '../../models/page.model';
import * as fromPageReducers from '../reducers/page.reducers';
import { State } from '../reducers';

export const selectPageFeature = (state: State): fromPageReducers.State => state.page;

export const selectApiCallProductsAtMainPage = createSelector(
  selectPageFeature,
  (pageFeature: fromPageReducers.State): ApiCall => pageFeature.apiCallProductsAtMainPage
);
