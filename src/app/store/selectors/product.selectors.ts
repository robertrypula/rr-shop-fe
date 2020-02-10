import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromProductReducers from '../reducers/product.reducers';
import { Product } from '../../models/product.model';
import { selectActiveCategory } from './category.selectors';
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

export const selectProductsFromActiveCategory = createSelector(
  selectProductFeature,
  selectActiveCategory,
  (productFeature: fromProductReducers.State, activeCategory: Category): Product[] => {
    const products: Product[] = Object.keys(productFeature).map((key: string): Product => productFeature[key]);

    return activeCategory
      ? products.filter((product: Product): boolean => product.categoryIds.includes(activeCategory.id))
      : [];
  }
);
