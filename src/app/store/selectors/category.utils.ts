import { CategoryStore, StructuralNode } from '../../models/category.model';
import { BREADCRUMBS_STRUCTURAL_NODES_LIMIT } from '../../config/config';

export const findChildren = (categoriesStore: CategoryStore[], parentId: number, result: CategoryStore[]): void => {
  const children: CategoryStore[] = categoriesStore.filter(
    (categoryStore: CategoryStore): boolean => categoryStore.parentId === parentId
  );
  children.forEach((child: CategoryStore): void => {
    result.push(child);
    findChildren(categoriesStore, child.id, result);
  });
};

export const getCategoriesStoreFromLeafToRoot = (
  categoriesStore: CategoryStore[],
  leafId: number,
  structuralNodeLimit: StructuralNode[] = BREADCRUMBS_STRUCTURAL_NODES_LIMIT
): CategoryStore[] => {
  const categoriesStoreFromLeafToRoot: CategoryStore[] = [];
  let foundCategoryStore: CategoryStore;
  let id: number = leafId;

  while (true) {
    foundCategoryStore = categoriesStore.find((categoryStore: CategoryStore): boolean => categoryStore.id === id);
    if (!foundCategoryStore || structuralNodeLimit.includes(foundCategoryStore.structuralNode)) {
      break;
    }
    categoriesStoreFromLeafToRoot.push(foundCategoryStore);
    id = foundCategoryStore.parentId;
  }

  return categoriesStoreFromLeafToRoot;
};

export const getCategoryStoreAndItsChildren = (
  categoriesStore: CategoryStore[],
  categoryId: number
): CategoryStore[] => {
  const categoryStore: CategoryStore = categoriesStore.find((c: CategoryStore): boolean => c.id === categoryId);
  const result: CategoryStore[] = [];

  if (categoryStore) {
    result.push(categoryStore);
    findChildren(categoriesStore, categoryStore.id, result);
  }

  return result;
};
