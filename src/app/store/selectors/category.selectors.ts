import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromCategoryReducers from '../reducers/category.reducers';
import { Category, StructuralNode } from '../../models/category.model';

export const selectCategoryFeature = (state: State): fromCategoryReducers.State => state.category;

export const selectCategories = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): Category[] => {
    return Object.keys(categoryFeature.list).map((key: string): Category => categoryFeature.list[key]);
  }
);

export const selectActiveCategory = createSelector(
  selectCategories,
  (categories: Category[]): Category => {
    return categories.find((category: Category): boolean => category.activeLevel === 1);
  }
);

const findChildren = (categories: Category[], parentId: number, result: Category[]): void => {
  const children: Category[] = categories.filter((category: Category): boolean => category.parentId === parentId);
  children.forEach((child: Category): void => {
    result.push(child);
    findChildren(categories, child.id, result);
  });
};

export const selectActiveCategoryAndItsChildren = createSelector(
  selectCategories,
  selectActiveCategory,
  (categories: Category[], activeCategory: Category): Category[] => {
    const result: Category[] = [];

    if (activeCategory) {
      result.push(activeCategory);
      findChildren(categories, activeCategory.id, result);
    }

    return result;
  }
);

export const selectCategory = createSelector(
  selectCategories,
  (categories: Category[], props: { id: number; structuralNode: StructuralNode }): Category => {
    let foundCategory: Category = null;

    if (props) {
      if (props.structuralNode) {
        foundCategory = categories.find(
          (category: Category): boolean => category.structuralNode === props.structuralNode
        );
      } else if (props.id) {
        foundCategory = categories.find((category: Category): boolean => category.id === props.id);
      }
    }

    return foundCategory;
  }
);

export const selectCategoriesBy = createSelector(
  selectCategories,
  (categories: Category[], props: { parentId: number; structuralNode: StructuralNode }): Category[] => {
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

export const selectCategoriesWithActiveLevel = createSelector(
  selectCategories,
  (categories: Category[]): Category[] => {
    return categories.filter((category: Category): boolean => !!category.activeLevel);
  }
);
