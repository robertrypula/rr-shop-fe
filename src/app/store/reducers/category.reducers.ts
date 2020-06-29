import { Action, createReducer, on } from '@ngrx/store';

import * as fromCategoryActions from '../actions/category.actions';
import { ActiveLevelUpdateEntry, CategoryStore } from '../../models/category.model';
import { ApiCall } from '../../models/root.model';

export interface State {
  apiCallCategoriesAtInit: ApiCall;
  isListCollapsed: boolean;
  list: {
    [id: number]: CategoryStore;
  };
}

export const initialState: State = {
  apiCallCategoriesAtInit: ApiCall.Initial,
  isListCollapsed: false,
  list: {}
};

const categoryReducer = createReducer(
  initialState,
  on(
    fromCategoryActions.categoriesAtInitRequest,
    (state: State): State => ({ ...state, apiCallCategoriesAtInit: ApiCall.Request })
  ),
  on(
    fromCategoryActions.categoriesAtInitFailure,
    (state: State): State => ({ ...state, apiCallCategoriesAtInit: ApiCall.Failure })
  ),
  on(
    fromCategoryActions.categoriesAtInitSuccess,
    (state: State, { categories }): State => {
      const newState: State = { ...state, list: { ...state.list }, apiCallCategoriesAtInit: ApiCall.Success };

      categories.forEach((category: CategoryStore): void => {
        newState.list[category.id] = { ...state.list[category.id], ...category };
      });

      return newState;
    }
  ),
  on(
    fromCategoryActions.setActiveLevel,
    (state: State, { activeLevelUpdateEntries }): State => {
      const newState: State = { ...state, list: { ...state.list } };

      activeLevelUpdateEntries.forEach((categorySetActiveLevel: ActiveLevelUpdateEntry): void => {
        newState.list[categorySetActiveLevel.id] = {
          ...state.list[categorySetActiveLevel.id],
          activeLevel: categorySetActiveLevel.activeLevel
        };
      });

      return newState;
    }
  ),
  on(
    fromCategoryActions.setIsListCollapsed,
    (state: State, { newValue }): State => {
      return { ...state, isListCollapsed: newValue };
    }
  )
);

export function reducer(state: State | undefined, action: Action) {
  return categoryReducer(state, action);
}
