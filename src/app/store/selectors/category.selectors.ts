import { createSelector } from '@ngrx/store';

import { ActiveLevelUpdateEntry, CategoryStore, StructuralNode } from '../../models/category.model';
import { selectUrl } from './router.selectors';
import { getCategoryId, isOnCategoryRoute } from '../../utils/routing.utils';
import { selectIsSmallDevice } from './viewport.selectors';
import { selectCategoriesStoreAsArray, selectCategoriesStoreAsKeyValue } from './category-core.selectors';
import { getCategoriesStoreFromLeafToRoot, getCategoryStoreAndItsChildren } from './category.utils';

export const selectActiveCategoryId = createSelector(selectUrl, (url: string): number => {
  return getCategoryId(url);
});

export const selectActiveCategoryStore = createSelector(
  selectActiveCategoryId,
  selectCategoriesStoreAsKeyValue,
  (activeCategoryId: number, categoriesStoreAsKeyValue: { [key: string]: CategoryStore }): CategoryStore => {
    return activeCategoryId ? categoriesStoreAsKeyValue[activeCategoryId] : null;
  }
);

export const selectCategoriesStoreWithActiveLevel = createSelector(
  selectCategoriesStoreAsArray,
  (categoriesStoreAsArray: CategoryStore[]): CategoryStore[] => {
    return categoriesStoreAsArray.filter((categoryStore: CategoryStore): boolean => !!categoryStore.activeLevel);
  }
);

export const selectCategoriesWithActiveLevelSorted = createSelector(
  selectCategoriesStoreWithActiveLevel,
  (categoriesStoreWithActiveLevel: CategoryStore[]): CategoryStore[] => {
    return categoriesStoreWithActiveLevel.sort((a: CategoryStore, b: CategoryStore): number =>
      a.activeLevel === b.activeLevel ? 0 : a.activeLevel < b.activeLevel ? 1 : -1
    );
  }
);

export const selectActiveLevelUpdateEntriesBasedOnRoute = createSelector(
  selectActiveCategoryId,
  selectCategoriesStoreWithActiveLevel,
  selectCategoriesStoreAsKeyValue,
  (
    activeCategoryId: number,
    categoriesStoreWithActiveLevel: CategoryStore[],
    categoriesStoreAsKeyValue: { [key: string]: CategoryStore }
  ): ActiveLevelUpdateEntry[] => {
    const categoriesStoreFromLeafToRoot: CategoryStore[] = getCategoriesStoreFromLeafToRoot(
      categoriesStoreAsKeyValue,
      activeCategoryId
    );
    const result: ActiveLevelUpdateEntry[] = [];

    categoriesStoreWithActiveLevel.forEach((categoryStoreWithActiveLevel: CategoryStore): void => {
      result.push({ id: categoryStoreWithActiveLevel.id, activeLevel: null });
    });
    categoriesStoreFromLeafToRoot.forEach((categoryStoreWithActiveLevel: CategoryStore, index: number): void => {
      result.push({ id: categoryStoreWithActiveLevel.id, activeLevel: index + 1 });
    });

    return result;
  }
);

export const selectCategoryStoreAndItsChildren = createSelector(
  selectCategoriesStoreAsArray,
  (categoriesStoreAsArray: CategoryStore[], props: { id: number }): CategoryStore[] =>
    getCategoryStoreAndItsChildren(categoriesStoreAsArray, props.id)
);

export const selectActiveCategoryAndItsChildren = createSelector(
  selectCategoriesStoreAsArray,
  selectActiveCategoryId,
  (categoriesStoreAsArray: CategoryStore[], activeCategoryId: number): CategoryStore[] =>
    getCategoryStoreAndItsChildren(categoriesStoreAsArray, activeCategoryId)
);

export const selectCategoryStore = createSelector(
  selectCategoriesStoreAsArray,
  (categoriesStoreAsArray: CategoryStore[], props: { id: number; structuralNode: StructuralNode }): CategoryStore => {
    let foundCategoryStore: CategoryStore = null;

    if (props) {
      if (props.structuralNode) {
        foundCategoryStore = categoriesStoreAsArray.find(
          (categoryStore: CategoryStore): boolean => categoryStore.structuralNode === props.structuralNode
        );
      } else if (props.id) {
        foundCategoryStore = categoriesStoreAsArray.find(
          (categoryStore: CategoryStore): boolean => categoryStore.id === props.id
        );
      }
    }

    return foundCategoryStore;
  }
);

export const selectCategoriesStoreBy = createSelector(
  selectCategoriesStoreAsArray,
  (
    categoriesStoreAsArray: CategoryStore[],
    props: { parentId: number; structuralNode: StructuralNode }
  ): CategoryStore[] => {
    let parentId: number = null;

    if (props) {
      if (props.structuralNode) {
        const structuralNodeCategoryStore: CategoryStore = categoriesStoreAsArray.find(
          (categoryStore: CategoryStore): boolean => categoryStore.structuralNode === props.structuralNode
        );
        parentId = structuralNodeCategoryStore ? structuralNodeCategoryStore.id : null;
      } else if (props.parentId) {
        parentId = props.parentId;
      }
    }

    return props
      ? categoriesStoreAsArray.filter((categoryStore: CategoryStore): boolean => categoryStore.parentId === parentId)
      : categoriesStoreAsArray;
  }
);

export const selectIsCollapseExpandButtonVisible = createSelector(
  selectIsSmallDevice,
  (isSmallDevice: boolean): boolean => isSmallDevice
);

export const selectIsOnCategoryRoute = createSelector(selectUrl, (url: string): boolean => isOnCategoryRoute(url));
