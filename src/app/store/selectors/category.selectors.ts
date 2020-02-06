import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromCategoryReducers from '../reducers/category.reducers';
import { Category, StructuralNode } from '../../models/category.model';

export const selectCategoryFeature = (state: State): fromCategoryReducers.State => state.category;

export const selectCategories = createSelector(
  selectCategoryFeature,
  (
    productFeature: fromCategoryReducers.State,
    props: { parentId: number; structuralNode: StructuralNode }
  ): Category[] => {
    const categories: Category[] = Object.keys(productFeature).map(key => productFeature[key]);
    let parentId: number = null;

    if (props) {
      if (props.structuralNode) {
        const structuralNodeCategory: Category = categories.find(
          (category: Category): boolean => category.structuralNode === props.structuralNode
        );
        parentId = structuralNodeCategory ? structuralNodeCategory.id : null;
      } else if (props.parentId) {
        parentId = props.parentId;
      }
    }

    return props ? categories.filter((category: Category): boolean => category.parentId === parentId) : categories;
  }
);
