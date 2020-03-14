import { CategoryStore, StructuralNode } from '../../models/category.model';
import { BREADCRUMBS_STRUCTURAL_NODES_LIMIT } from '../../config/config';

export const findChildren = (categoriesAsArray: CategoryStore[], parentId: number, result: CategoryStore[]): void => {
  const children: CategoryStore[] = categoriesAsArray.filter(
    (category: CategoryStore): boolean => category.parentId === parentId
  );
  children.forEach((child: CategoryStore): void => {
    result.push(child);
    findChildren(categoriesAsArray, child.id, result);
  });
};

export const getCategoriesAsArray = (categoriesAsKeyValue: { [key: number]: CategoryStore }): CategoryStore[] => {
  return Object.keys(categoriesAsKeyValue).map((key: string): CategoryStore => categoriesAsKeyValue[+key]);
};

export const getCategoriesFromLeafToRoot = (
  categoriesAsKeyValue: { [key: string]: CategoryStore },
  leafId: number,
  structuralNodeLimit: StructuralNode[] = BREADCRUMBS_STRUCTURAL_NODES_LIMIT
): CategoryStore[] => {
  const categoriesFromLeafToRoot: CategoryStore[] = [];
  let category: CategoryStore;
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

export const getCategoryAndItsChildren = (categoriesAsArray: CategoryStore[], id: number): CategoryStore[] => {
  const category: CategoryStore = categoriesAsArray.find((c: CategoryStore): boolean => c.id === id);
  const result: CategoryStore[] = [];

  if (category) {
    result.push(category);
    findChildren(categoriesAsArray, category.id, result);
  }

  return result;
};
