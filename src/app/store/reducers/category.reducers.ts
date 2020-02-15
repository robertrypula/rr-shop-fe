import { Action, createReducer, on } from '@ngrx/store';

import * as fromCategoryActions from '../actions/category.actions';
import { Category, ActiveLevelUpdateEntry } from '../../models/category.model';

export interface State {
  list: {
    [id: number]: Category;
  };
}

export const initialState: State = {
  list: {}
};

const categoryReducer = createReducer(
  initialState,
  on(
    fromCategoryActions.categoriesSuccess,
    (state: State, { categories }): State => {
      const newState: State = { ...state, list: { ...state.list } };

      categories.forEach((category: Category): void => {
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
  )
);

export function reducer(state: State | undefined, action: Action) {
  return categoryReducer(state, action);
}
