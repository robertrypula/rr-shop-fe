import { createSelector } from '@ngrx/store';

import * as fromCategoryReducers from '../reducers/category.reducers';
import { CategoryStore } from '../../models/category.model';
import { State } from '../reducers';
import { ApiCall } from '../../models/page.model';
import { getCategoriesAsArray } from './category.utils';

export const selectCategoryFeature = (state: State): fromCategoryReducers.State => state.category;

export const selectCategoriesAsArray = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): CategoryStore[] => getCategoriesAsArray(categoryFeature.list)
);

export const selectCategoriesAsKeyValue = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): { [id: number]: CategoryStore } => categoryFeature.list
);

export const selectCategoryLength = createSelector(selectCategoriesAsArray, (categoriesAsArray: CategoryStore[]): number => {
  return categoriesAsArray.length;
});

export const selectApiCallCategoriesAtInit = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): ApiCall => categoryFeature.apiCallCategoriesAtInit
);

export const selectIsListCollapsed = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): boolean => categoryFeature.isListCollapsed
);
