import { createSelector } from '@ngrx/store';

import { ActiveLevelUpdateEntry, CategoryStore, StructuralNode } from '../../models/category.model';
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
  (activeCategoryId: number, categoriesAsKeyValue: { [key: string]: CategoryStore }): CategoryStore => {
    return activeCategoryId ? categoriesAsKeyValue[activeCategoryId] : null;
  }
);

export const selectCategoriesWithActiveLevel = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: CategoryStore[]): CategoryStore[] => {
    return categoriesAsArray.filter((category: CategoryStore): boolean => !!category.activeLevel);
  }
);

export const selectCategoriesWithActiveLevelSorted = createSelector(
  selectCategoriesWithActiveLevel,
  (categoriesWithActiveLevel: CategoryStore[]): CategoryStore[] => {
    return categoriesWithActiveLevel.sort((a: CategoryStore, b: CategoryStore): number =>
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
    categoriesWithActiveLevel: CategoryStore[],
    categoriesAsKeyValue: { [key: string]: CategoryStore }
  ): ActiveLevelUpdateEntry[] => {
    const categoriesFromLeafToRoot: CategoryStore[] = getCategoriesFromLeafToRoot(categoriesAsKeyValue, activeCategoryId);
    const result: ActiveLevelUpdateEntry[] = [];

    categoriesWithActiveLevel.forEach((categoryWithActiveLevel: CategoryStore): void => {
      result.push({ id: categoryWithActiveLevel.id, activeLevel: null });
    });
    categoriesFromLeafToRoot.forEach((categoryWithActiveLevel: CategoryStore, index: number): void => {
      result.push({ id: categoryWithActiveLevel.id, activeLevel: index + 1 });
    });

    return result;
  }
);

export const selectCategoryAndItsChildren = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: CategoryStore[], props: { id: number }): CategoryStore[] =>
    getCategoryAndItsChildren(categoriesAsArray, props.id)
);

export const selectActiveCategoryAndItsChildren = createSelector(
  selectCategoriesAsArray,
  selectActiveCategoryId,
  (categoriesAsArray: CategoryStore[], activeCategoryId: number): CategoryStore[] =>
    getCategoryAndItsChildren(categoriesAsArray, activeCategoryId)
);

export const selectCategory = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: CategoryStore[], props: { id: number; structuralNode: StructuralNode }): CategoryStore => {
    let foundCategory: CategoryStore = null;

    if (props) {
      if (props.structuralNode) {
        foundCategory = categoriesAsArray.find(
          (category: CategoryStore): boolean => category.structuralNode === props.structuralNode
        );
      } else if (props.id) {
        foundCategory = categoriesAsArray.find((category: CategoryStore): boolean => category.id === props.id);
      }
    }

    return foundCategory;
  }
);

export const selectCategoriesBy = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: CategoryStore[], props: { parentId: number; structuralNode: StructuralNode }): CategoryStore[] => {
    let parentId: number = null;

    if (props) {
      if (props.structuralNode) {
        const structuralNodeCategory: CategoryStore = categoriesAsArray.find(
          (category: CategoryStore): boolean => category.structuralNode === props.structuralNode
        );
        parentId = structuralNodeCategory ? structuralNodeCategory.id : null;
      } else if (props.parentId) {
        parentId = props.parentId;
      }
    }

    return props
      ? categoriesAsArray.filter((category: CategoryStore): boolean => category.parentId === parentId)
      : categoriesAsArray;
  }
);

export const selectIsCollapseExpandButtonVisible = createSelector(
  selectIsSmallDevice,
  (isSmallDevice: boolean): boolean => isSmallDevice
);

export const selectIsOnCategoryRoute = createSelector(selectUrl, (url: string): boolean => isOnCategoryRoute(url));
