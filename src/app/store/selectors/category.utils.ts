import { CategoryStore, StructuralNode } from '../../models/category.model';
import { BREADCRUMBS_STRUCTURAL_NODES_LIMIT } from '../../config/config';

export const findChildren = (
  categoriesStoreAsArray: CategoryStore[],
  parentId: number,
  result: CategoryStore[]
): void => {
  const children: CategoryStore[] = categoriesStoreAsArray.filter(
    (categoryStore: CategoryStore): boolean => categoryStore.parentId === parentId
  );
  children.forEach((child: CategoryStore): void => {
    result.push(child);
    findChildren(categoriesStoreAsArray, child.id, result);
  });
};

export const getCategoriesStoreFromLeafToRoot = (
  categoriesStoreAsArray: CategoryStore[],
  leafId: number,
  structuralNodeLimit: StructuralNode[] = BREADCRUMBS_STRUCTURAL_NODES_LIMIT
): CategoryStore[] => {
  const categoriesStoreFromLeafToRoot: CategoryStore[] = [];
  let categoryStore: CategoryStore;
  let id: number = leafId;

  while (true) {
    categoryStore = categoriesStoreAsArray.find((categoriesStore: CategoryStore): boolean => categoriesStore.id === id);
    if (!categoryStore || structuralNodeLimit.includes(categoryStore.structuralNode)) {
      break;
    }
    categoriesStoreFromLeafToRoot.push(categoryStore);
    id = categoryStore.parentId;
  }

  return categoriesStoreFromLeafToRoot;
};

export const getCategoryStoreAndItsChildren = (
  categoriesStoreAsArray: CategoryStore[],
  id: number
): CategoryStore[] => {
  const categoryStore: CategoryStore = categoriesStoreAsArray.find((c: CategoryStore): boolean => c.id === id);
  const result: CategoryStore[] = [];

  if (categoryStore) {
    result.push(categoryStore);
    findChildren(categoriesStoreAsArray, categoryStore.id, result);
  }

  return result;
};
