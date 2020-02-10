import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromProductReducers from '../reducers/product.reducers';
import { Product } from '../../models/product.model';
import { selectActiveCategory, selectActiveCategoryAndItsChildren } from './category.selectors';
import { Category } from '../../models/category.model';

export const selectProductFeature = (state: State): fromProductReducers.State => state.product;

export const selectProducts = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State, props: { categoryId: number }): Product[] => {
    const products: Product[] = Object.keys(productFeature).map((key: string): Product => productFeature[key]);

    return props
      ? props.categoryId
        ? products.filter((product: Product): boolean => product.categoryIds.includes(props.categoryId))
        : []
      : products;
  }
);

export const selectProductsFromActiveCategoryAndItsChildren = createSelector(
  selectProductFeature,
  selectActiveCategoryAndItsChildren,
  (productFeature: fromProductReducers.State, activeCategoryAndItsChildren: Category[]): Product[] => {
    const products: Product[] = Object.keys(productFeature).map((key: string): Product => productFeature[key]);

    return activeCategoryAndItsChildren.length
      ? products.filter((product: Product): boolean => {
          let match = false;

          for (let i = 0; i < activeCategoryAndItsChildren.length; i++) {
            match = product.categoryIds.includes(activeCategoryAndItsChildren[i].id);
            if (match) {
              break;
            }
          }

          return match;
        })
      : [];
  }
);
