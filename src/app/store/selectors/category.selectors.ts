import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromCategoryReducers from '../reducers/category.reducers';
import { Category, StructuralNode } from '../../models/category.model';

export const selectCategoryFeature = (state: State): fromCategoryReducers.State => state.category;

export const selectActiveCategory = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): Category => {
    return Object.keys(categoryFeature)
      .map((key: string): Category => categoryFeature[key])
      .find((category: Category): boolean => category.activeLevel === 1);
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
  selectCategoryFeature,
  selectActiveCategory,
  (categoryFeature: fromCategoryReducers.State, activeCategory: Category): Category[] => {
    const categories: Category[] = Object.keys(categoryFeature).map((key: string): Category => categoryFeature[key]);
    const result: Category[] = [];

    result.push(activeCategory);
    findChildren(categories, activeCategory.id, result);

    return result;
  }
);

export const selectCategory = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State, props: { id: number; structuralNode: StructuralNode }): Category => {
    const categories: Category[] = Object.keys(categoryFeature).map((key: string): Category => categoryFeature[key]);
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

export const selectCategories = createSelector(
  selectCategoryFeature,
  (
    categoryFeature: fromCategoryReducers.State,
    props: { parentId: number; structuralNode: StructuralNode }
  ): Category[] => {
    const categories: Category[] = Object.keys(categoryFeature).map((key: string): Category => categoryFeature[key]);
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
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): Category[] => {
    return Object.keys(categoryFeature)
      .map((key: string): Category => categoryFeature[key])
      .filter((category: Category): boolean => !!category.activeLevel);
  }
);
