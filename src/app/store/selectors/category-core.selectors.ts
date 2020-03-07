import { createSelector } from '@ngrx/store';

import * as fromCategoryReducers from '../reducers/category.reducers';
import { Category } from '../../models/category.model';
import { State } from '../reducers';
import { ApiCall } from '../../models/generic.model';
import { getCategoriesAsArray } from './category.utils';

export const selectCategoryFeature = (state: State): fromCategoryReducers.State => state.category;

export const selectCategoriesAsArray = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): Category[] => getCategoriesAsArray(categoryFeature.list)
);

export const selectCategoriesAsKeyValue = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): { [id: number]: Category } => categoryFeature.list
);

export const selectCategoryLength = createSelector(selectCategoriesAsArray, (categoriesAsArray: Category[]): number => {
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
