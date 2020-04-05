import { createSelector } from '@ngrx/store';

import * as fromCategoryReducers from '../reducers/category.reducers';
import { CategoryStore } from '../../models/category.model';
import { State } from '../reducers';
import { ApiCall } from '../../models/page.model';
import { getAsArray } from '../../utils/transfomation.utils';

export const selectCategoryFeature = (state: State): fromCategoryReducers.State => state.category;

export const selectCategoriesStoreAsArray = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): CategoryStore[] => getAsArray(categoryFeature.list)
);

export const selectCategoryStoreLength = createSelector(
  selectCategoriesStoreAsArray,
  (categoriesAsArray: CategoryStore[]): number => {
    return categoriesAsArray.length;
  }
);

export const selectApiCallCategoriesAtInit = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): ApiCall => categoryFeature.apiCallCategoriesAtInit
);

export const selectIsListCollapsed = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): boolean => categoryFeature.isListCollapsed
);
