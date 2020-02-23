import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromProductReducers from '../reducers/product.reducers';
import { Product } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryAndItsChildren } from './category.selectors';
import { Category } from '../../models/category.model';
import { ApiCall } from '../../models/generic.model';
import { selectUrl } from './router.selectors';
import { getProductId, isOnProductRoute } from '../../utils/routing.util';

export const selectProductFeature = (state: State): fromProductReducers.State => state.product;

export const selectActiveProductId = createSelector(selectUrl, (url: string): number => {
  return getProductId(url);
});

export const selectProductsAsKeyValue = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): { [id: number]: Product } => {
    return productFeature.list;
  }
);

export const selectApiCallProduct = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ApiCall => productFeature.apiCallProduct
);

export const selectApiCallProductsAtCategory = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ApiCall => productFeature.apiCallProductsAtCategory
);

export const selectApiCallProductsAtInit = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): ApiCall => productFeature.apiCallProductsAtInit
);

export const selectProductsAsArray = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): Product[] =>
    Object.keys(productFeature.list).map((key: string): Product => productFeature.list[key])
);

export const selectProductsLength = createSelector(selectProductsAsArray, (productsAsArray: Product[]): number => {
  return productsAsArray.length;
});

export const selectActiveProduct = createSelector(
  selectActiveProductId,
  selectProductsAsKeyValue,
  (activeProductId: number, productsAsKeyValue: { [key: string]: Product }): Product => {
    console.log(activeProductId);
    return activeProductId ? productsAsKeyValue[activeProductId] : null;
  }
);

const getProductsForGivenCategories = (productsAsArray: Product[], categories: Category[]): Product[] => {
  return categories.length
    ? productsAsArray.filter((product: Product): boolean => {
        let match = false;

        for (let i = 0; i < categories.length; i++) {
          match = product.categoryIds.includes(categories[i].id);
          if (match) {
            break;
          }
        }

        return match;
      })
    : [];
};

export const selectProductsFromActiveCategoryAndItsChildren = createSelector(
  selectProductsAsArray,
  selectActiveCategoryAndItsChildren,
  (productsAsArray: Product[], activeCategoryAndItsChildren: Category[]): Product[] =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren)
);

export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsAsArray,
  selectCategoryAndItsChildren,
  (productsAsArray: Product[], activeCategoryAndItsChildren: Category[], props: { id: number }): number =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren).length
);

export const selectIsOnProductRoute = createSelector(selectUrl, (url: string): boolean => isOnProductRoute(url));
