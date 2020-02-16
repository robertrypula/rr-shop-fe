import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromCategoryReducers from '../reducers/category.reducers';
import { ActiveLevelUpdateEntry, Category, StructuralNode } from '../../models/category.model';
import { BREADCRUMBS_STRUCTURAL_NODES_LIMIT, SMALL_DEVICE_DEFINITION } from '../../config/config';
import { selectUrl } from './router.selectors';
import { getCategoryId } from '../../utils/routing.util';
import { selectDevice } from './viewport.selectors';
import { Device } from '../../models/viewport.model';

export const selectCategoryFeature = (state: State): fromCategoryReducers.State => state.category;

export const selectCategoriesAsArray = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): Category[] => {
    return Object.keys(categoryFeature.list).map((key: string): Category => categoryFeature.list[key]);
  }
);

export const selectCategoriesAsKeyValue = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): { [id: number]: Category } => {
    return categoryFeature.list;
  }
);

export const selectActiveCategory = createSelector(
  selectCategoriesAsArray,
  (categoriesAsArray: Category[]): Category => {
    return categoriesAsArray.find((category: Category): boolean => category.activeLevel === 1);
  }
);

export const getCategoriesFromLeafToRoot = (
  categoriesAsKeyValue: { [key: string]: Category },
  leafId: number,
  structuralNodeLimit: StructuralNode[] = BREADCRUMBS_STRUCTURAL_NODES_LIMIT
): Category[] => {
  const categoriesFromLeafToRoot: Category[] = [];
  let category: Category;
  let id: number = leafId;

  while (true) {
    category = categoriesAsKeyValue[id];
    if (!category || structuralNodeLimit.includes(category.structuralNode)) {
      break;
    }
    categoriesFromLeafToRoot.push(category);
    id = category.parentId;
  }

  return categoriesFromLeafToRoot;
};

export const selectActiveCategoryId = createSelector(selectUrl, (url: string): number => {
  return getCategoryId(url); // TODO get category id also from product route
});

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

const findChildren = (categoriesAsArray: Category[], parentId: number, result: Category[]): void => {
  const children: Category[] = categoriesAsArray.filter(
    (category: Category): boolean => category.parentId === parentId
  );
  children.forEach((child: Category): void => {
    result.push(child);
    findChildren(categoriesAsArray, child.id, result);
  });
};

export const selectActiveCategoryAndItsChildren = createSelector(
  selectCategoriesAsArray,
  selectActiveCategory,
  (categoriesAsArray: Category[], activeCategory: Category): Category[] => {
    const result: Category[] = [];

    if (activeCategory) {
      result.push(activeCategory);
      findChildren(categoriesAsArray, activeCategory.id, result);
    }

    return result;
  }
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

export const selectIsCollapseExpandButtonVisible = createSelector(selectDevice, (device: Device): boolean =>
  SMALL_DEVICE_DEFINITION.includes(device)
);

export const selectIsListCollapsed = createSelector(
  selectCategoryFeature,
  (categoryFeature: fromCategoryReducers.State): boolean => categoryFeature.isListCollapsed
);
