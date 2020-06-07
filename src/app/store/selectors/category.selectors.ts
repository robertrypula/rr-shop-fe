import { createSelector } from '@ngrx/store';

import { ActiveLevelUpdateEntry, CategoryStore, StructuralNode } from '../../models/category.model';
import { ProductSortBy } from '../../models/product.model';
import { getCategoryId, getCategoryProductSortBy, isOnCategoryRoute } from '../../utils/routing.utils';

import { selectCategoriesStore } from './category-core.selectors';
import { getCategoriesStoreFromLeafToRoot, getCategoryStoreAndItsChildren } from './category.utils';
import { selectUrl } from './router.selectors';
import { selectIsSmallDevice } from './viewport.selectors';

const sortByName = (a: CategoryStore, b: CategoryStore): number => {
  return a.name === b.name ? 0 : a.name > b.name ? 1 : -1;
};

const sortBySortOrder = (a: CategoryStore, b: CategoryStore): number => {
  return a.sortOrder === b.sortOrder ? 0 : a.sortOrder < b.sortOrder ? 1 : -1;
};

const sortCategoriesHandler = (a: CategoryStore, b: CategoryStore): number => {
  return sortBySortOrder(a, b) || sortByName(a, b);
};

export const selectActiveCategoryId = createSelector(selectUrl, (url: string): number => {
  return getCategoryId(url);
});

export const selectActiveCategoryProductSortBy = createSelector(
  selectUrl,
  (url: string): ProductSortBy => {
    return getCategoryProductSortBy(url);
  }
);

export const selectActiveCategoryStore = createSelector(
  selectActiveCategoryId,
  selectCategoriesStore,
  (activeCategoryId: number, categoriesStore: CategoryStore[]): CategoryStore => {
    return categoriesStore.find((categoryStore: CategoryStore): boolean => categoryStore.id === activeCategoryId);
  }
);

export const selectActiveCategoryStoreChildren = createSelector(
  selectActiveCategoryId,
  selectCategoriesStore,
  (activeCategoryId: number, categoriesStore: CategoryStore[]): CategoryStore[] => {
    return categoriesStore.filter(
      (categoryStore: CategoryStore): boolean => categoryStore.parentId === activeCategoryId
    );
  }
);

export const selectCategoriesStoreWithActiveLevel = createSelector(
  selectCategoriesStore,
  (categoriesStore: CategoryStore[]): CategoryStore[] => {
    return categoriesStore.filter((categoryStore: CategoryStore): boolean => !!categoryStore.activeLevel);
  }
);

export const selectCategoriesStoreWithActiveLevelSorted = createSelector(
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

export const selectActiveCategoryStoreAndItsChildren = createSelector(
  selectCategoriesStore,
  selectActiveCategoryId,
  (categoriesStore: CategoryStore[], activeCategoryId: number): CategoryStore[] =>
    getCategoryStoreAndItsChildren(categoriesStore, activeCategoryId)
);

export const selectCategoryStore = createSelector(
  selectCategoriesStore,
  (categoriesStore: CategoryStore[], props: { categoryId: number; structuralNode: StructuralNode }): CategoryStore => {
    let foundCategoryStore: CategoryStore = null;

    if (props) {
      if (props.structuralNode) {
        foundCategoryStore = categoriesStore.find(
          (categoryStore: CategoryStore): boolean => categoryStore.structuralNode === props.structuralNode
        );
      } else if (props.categoryId) {
        foundCategoryStore = categoriesStore.find(
          (categoryStore: CategoryStore): boolean => categoryStore.id === props.categoryId
        );
      }
    }

    return foundCategoryStore;
  }
);

export const selectCategoryStoreWithParentByCategoryId = (categoryId: number) =>
  createSelector(
    selectCategoriesStore,
    (categoriesStore: CategoryStore[]): CategoryStore => {
      let foundCategoryStore: CategoryStore = categoriesStore.find(
        (categoryStore: CategoryStore): boolean => categoryStore.id === categoryId
      );

      if (foundCategoryStore) {
        // TODO this is hack, will be fixed when store object will be moved to ORM like instance
        foundCategoryStore = { ...foundCategoryStore };
        foundCategoryStore.parent = categoriesStore.find(
          (categoryStore: CategoryStore): boolean => categoryStore.id === foundCategoryStore.parentId
        );
      }

      return foundCategoryStore;
    }
  );

// TODO -------
export const selectCategoriesStoreBy = createSelector(
  selectCategoriesStore,
  (categoriesStore: CategoryStore[], props: { parentId: number; structuralNode: StructuralNode }): CategoryStore[] => {
    let parentId: number = null;

    if (props) {
      if (props.structuralNode) {
        const structuralNodeCategoryStore: CategoryStore = categoriesStore.find(
          (categoryStore: CategoryStore): boolean => categoryStore.structuralNode === props.structuralNode
        );
        if (!structuralNodeCategoryStore) {
          return [];
        }
        parentId = structuralNodeCategoryStore.id;
      } else if (props.parentId) {
        parentId = props.parentId;
      }
    }

    return (props
      ? categoriesStore.filter((categoryStore: CategoryStore): boolean => categoryStore.parentId === parentId)
      : categoriesStore
    ).sort(sortCategoriesHandler);
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
