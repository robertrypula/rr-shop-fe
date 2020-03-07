import { createSelector } from '@ngrx/store';

import { ActiveLevelUpdateEntry, Category, StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getCategoryId, isOnCategoryRoute } from '../../utils/routing.util';
import { selectIsSmallDevice } from './viewport.selectors';
import { selectCategoriesAsArray, selectCategoriesAsKeyValue } from './category-core.selectors';
import { getCategoriesFromLeafToRoot, getCategoryAndItsChildren } from './category.utils';

export const selectActiveCategoryId = createSelector(selectUrl, (url: string): number => {
  return getCategoryId(url);
});

export const selectActiveCategory = createSelector(
  selectActiveCategoryId,
  selectCategoriesAsKeyValue,
  (activeCategoryId: number, categoriesAsKeyValue: { [key: string]: Category }): Category => {
    return activeCategoryId ? categoriesAsKeyValue[activeCategoryId] : null;
  }
);

export const selectCategoriesWithActiveLevel = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: Category[]): Category[] => {
    return categoriesAsArray.filter((category: Category): boolean => !!category.activeLevel);
  }
);

export const selectCategoriesWithActiveLevelSorted = createSelector(
  selectCategoriesWithActiveLevel,
  (categoriesWithActiveLevel: Category[]): Category[] => {
    return categoriesWithActiveLevel.sort((a: Category, b: Category): number =>
      a.activeLevel === b.activeLevel ? 0 : a.activeLevel < b.activeLevel ? 1 : -1
    );
  }
);

export const selectActiveLevelUpdateEntriesBasedOnRoute = createSelector(
  selectActiveCategoryId,
  selectCategoriesWithActiveLevel,
  selectCategoriesAsKeyValue,
  (
    activeCategoryId: number,
    categoriesWithActiveLevel: Category[],
    categoriesAsKeyValue: { [key: string]: Category }
  ): ActiveLevelUpdateEntry[] => {
    const categoriesFromLeafToRoot: Category[] = getCategoriesFromLeafToRoot(categoriesAsKeyValue, activeCategoryId);
    const result: ActiveLevelUpdateEntry[] = [];

    categoriesWithActiveLevel.forEach((categoryWithActiveLevel: Category): void => {
      result.push({ id: categoryWithActiveLevel.id, activeLevel: null });
    });
    categoriesFromLeafToRoot.forEach((categoryWithActiveLevel: Category, index: number): void => {
      result.push({ id: categoryWithActiveLevel.id, activeLevel: index + 1 });
    });

    return result;
  }
);

export const selectCategoryAndItsChildren = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: Category[], props: { id: number }): Category[] =>
    getCategoryAndItsChildren(categoriesAsArray, props.id)
);

export const selectActiveCategoryAndItsChildren = createSelector(
  selectCategoriesAsArray,
  selectActiveCategoryId,
  (categoriesAsArray: Category[], activeCategoryId: number): Category[] =>
    getCategoryAndItsChildren(categoriesAsArray, activeCategoryId)
);

export const selectCategory = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: Category[], props: { id: number; structuralNode: StructuralNode }): Category => {
    let foundCategory: Category = null;

    if (props) {
      if (props.structuralNode) {
        foundCategory = categoriesAsArray.find(
          (category: Category): boolean => category.structuralNode === props.structuralNode
        );
      } else if (props.id) {
        foundCategory = categoriesAsArray.find((category: Category): boolean => category.id === props.id);
      }
    }

    return foundCategory;
  }
);

export const selectCategoriesBy = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: Category[], props: { parentId: number; structuralNode: StructuralNode }): Category[] => {
    let parentId: number = null;

    if (props) {
      if (props.structuralNode) {
        const structuralNodeCategory: Category = categoriesAsArray.find(
          (category: Category): boolean => category.structuralNode === props.structuralNode
        );
        parentId = structuralNodeCategory ? structuralNodeCategory.id : null;
      } else if (props.parentId) {
        parentId = props.parentId;
      }
    }

    return props
      ? categoriesAsArray.filter((category: Category): boolean => category.parentId === parentId)
      : categoriesAsArray;
  }
);

export const selectIsCollapseExpandButtonVisible = createSelector(
  selectIsSmallDevice,
  (isSmallDevice: boolean): boolean => isSmallDevice
);

export const selectIsOnCategoryRoute = createSelector(selectUrl, (url: string): boolean => isOnCategoryRoute(url));
