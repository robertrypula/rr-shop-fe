import { Category } from '../../models/category.model';

export const getCategoriesAsArray = (categoriesAsKeyValue: { [key: number]: Category }): Category[] => {
  return Object.keys(categoriesAsKeyValue).map((key: string): Category => categoriesAsKeyValue[+key]);
};

const findChildren = (categoriesAsArray: Category[], parentId: number, result: Category[]): void => {
  const children: Category[] = categoriesAsArray.filter(
    (category: Category): boolean => category.parentId === parentId
  );
  children.forEach((child: Category): void => {
    result.push(child);
    findChildren(categoriesAsArray, child.id, result);
  });
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
