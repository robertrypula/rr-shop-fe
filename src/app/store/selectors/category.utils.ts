import { Category, StructuralNode } from '../../models/category.model';
import { BREADCRUMBS_STRUCTURAL_NODES_LIMIT } from '../../config/config';

export const findChildren = (categoriesAsArray: Category[], parentId: number, result: Category[]): void => {
  const children: Category[] = categoriesAsArray.filter(
    (category: Category): boolean => category.parentId === parentId
  );
  children.forEach((child: Category): void => {
    result.push(child);
    findChildren(categoriesAsArray, child.id, result);
  });
};

export const getCategoriesAsArray = (categoriesAsKeyValue: { [key: number]: Category }): Category[] => {
  return Object.keys(categoriesAsKeyValue).map((key: string): Category => categoriesAsKeyValue[+key]);
};

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

export const getCategoryAndItsChildren = (categoriesAsArray: Category[], id: number): Category[] => {
  const category: Category = categoriesAsArray.find((c: Category): boolean => c.id === id);
  const result: Category[] = [];

  if (category) {
    result.push(category);
    findChildren(categoriesAsArray, category.id, result);
  }

  return result;
};
