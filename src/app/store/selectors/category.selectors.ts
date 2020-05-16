import { createSelector } from '@ngrx/store';

import { ActiveLevelUpdateEntry, CategoryStore, StructuralNode } from '../../models/category.model';
import { getCategoryId, isOnCategoryRoute } from '../../utils/routing.utils';

import { selectCategoriesStore } from './category-core.selectors';
import { getCategoriesStoreFromLeafToRoot, getCategoryStoreAndItsChildren } from './category.utils';
import { selectUrl } from './router.selectors';
import { selectIsSmallDevice } from './viewport.selectors';

export const selectActiveCategoryId = createSelector(selectUrl, (url: string): number => {
  return getCategoryId(url);
});

export const selectActiveCategoryStore = createSelector(
  selectActiveCategoryId,
  selectCategoriesStore,
  (activeCategoryId: number, categoriesStore: CategoryStore[]): CategoryStore => {
    return categoriesStore.find((categoryStore: CategoryStore): boolean => categoryStore.id === activeCategoryId);
  }
);

export const selectCategoriesStoreWithActiveLevel = createSelector(
  selectCategoriesStore,
  (categoriesStore: CategoryStore[]): CategoryStore[] => {
    return categoriesStore.filter((categoryStore: CategoryStore): boolean => !!categoryStore.activeLevel);
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
  selectCategoriesStore,
  (
    activeCategoryId: number,
    categoriesStoreWithActiveLevel: CategoryStore[],
    categoriesStore: CategoryStore[]
  ): ActiveLevelUpdateEntry[] => {
    const categoriesStoreFromLeafToRoot: CategoryStore[] = getCategoriesStoreFromLeafToRoot(
      categoriesStore,
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
  selectCategoriesStore,
  (categoriesStore: CategoryStore[], props: { categoryId: number }): CategoryStore[] =>
    getCategoryStoreAndItsChildren(categoriesStore, props.categoryId)
);

export const selectActiveCategoryAndItsChildren = createSelector(
  selectCategoriesStore,
  selectActiveCategoryId,
  (categoriesStore: CategoryStore[], activeCategoryId: number): CategoryStore[] =>
    getCategoryStoreAndItsChildren(categoriesStore, activeCategoryId)
);

export const selectCategoryStore = createSelector(
  selectCategoriesStore,
  (categoriesStore: CategoryStore[], props: { id: number; structuralNode: StructuralNode }): CategoryStore => {
    let foundCategoryStore: CategoryStore = null;

    if (props) {
      if (props.structuralNode) {
        foundCategoryStore = categoriesStore.find(
          (categoryStore: CategoryStore): boolean => categoryStore.structuralNode === props.structuralNode
        );
      } else if (props.id) {
        foundCategoryStore = categoriesStore.find(
          (categoryStore: CategoryStore): boolean => categoryStore.id === props.id
        );
      }
    }

    return foundCategoryStore;
  }
);

export const selectCategoriesStoreBy = createSelector(
  selectCategoriesStore,
  (categoriesStore: CategoryStore[], props: { parentId: number; structuralNode: StructuralNode }): CategoryStore[] => {
    let parentId: number = null;

    if (props) {
      if (props.structuralNode) {
        const structuralNodeCategoryStore: CategoryStore = categoriesStore.find(
          (categoryStore: CategoryStore): boolean => categoryStore.structuralNode === props.structuralNode
        );
        parentId = structuralNodeCategoryStore ? structuralNodeCategoryStore.id : null;
      } else if (props.parentId) {
        parentId = props.parentId;
      }
    }

    return props
      ? categoriesStore.filter((categoryStore: CategoryStore): boolean => categoryStore.parentId === parentId)
      : categoriesStore;
  }
);

export const selectIsCollapseExpandButtonVisible = createSelector(
  selectIsSmallDevice,
  (isSmallDevice: boolean): boolean => isSmallDevice
);

export const selectShouldCallForProducts = createSelector(
  selectUrl,
  selectActiveCategoryStore,
  (url: string, activeCategoryStore: CategoryStore): boolean => {
    return isOnCategoryRoute(url) && !activeCategoryStore.isHiddenListOfProducts;
  }
);
