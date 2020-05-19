import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StructuralNode } from '../../models/category.model';
import { selectProductsStoreLength } from '../selectors/product-core.selectors';
import { Product } from '../../models/product.model';
import * as fromProductSelectors from '../selectors/product.selectors';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  public activeProduct$: Observable<Product> = this.store.pipe(select(fromProductSelectors.selectActiveProduct));
  public isOnProductRoute$: Observable<boolean> = this.store.pipe(select(fromProductSelectors.selectIsOnProductRoute));
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]> = this.store.pipe(
    select(fromProductSelectors.selectProductsFromActiveCategoryAndItsChildren)
  );
  public productsLength$: Observable<number> = this.store.pipe(select(selectProductsStoreLength));
  public urlProductId$: Observable<number> = this.store.pipe(select(fromProductSelectors.selectUrlProductId));

  public constructor(protected store: Store<State>) {}

  public productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId: number): Observable<number> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsCountFromCategoryAndItsChildrenByCategoryId, { categoryId })
    );
  }

  public productsFromCategoryById$(
    categoryId: number,
    limit = Infinity,
    productIdToExclude: number = null
  ): Observable<Product[]> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsFromCategoryByCategoryId(categoryId, limit, productIdToExclude))
    );
  }

  public productsFromCategoryByStructuralNode$(
    structuralNode: StructuralNode,
    limit = Infinity
  ): Observable<Product[]> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsFromCategoryByStructuralNode(structuralNode, limit))
    );
  }

  public productsFromCategoryLengthByCategoryId$(
    categoryId: number,
    productIdToExclude: number = null
  ): Observable<number> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsFromCategoryLengthByCategoryId(categoryId, productIdToExclude))
    );
  }
}
