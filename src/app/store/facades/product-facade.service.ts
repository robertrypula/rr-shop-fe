import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Product } from '../../models/product.model';
import * as fromProductSelectors from '../selectors/product.selectors';
import { selectProductsStoreLength } from '../selectors/product-core.selectors';
import { StructuralNode } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  public activeProduct$: Observable<Product> = this.store.pipe(
    select(fromProductSelectors.selectActiveProduct)
  );
  public isOnProductRoute$: Observable<boolean> = this.store.pipe(select(fromProductSelectors.selectIsOnProductRoute));
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]> = this.store.pipe(
    select(fromProductSelectors.selectProductsFromActiveCategoryAndItsChildren)
  );
  public productsLength$: Observable<number> = this.store.pipe(select(selectProductsStoreLength));
  public urlProductId$: Observable<number> = this.store.pipe(select(fromProductSelectors.selectUrlProductId));

  public constructor(protected store: Store<State>) {}

  public productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId: number): Observable<number> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsCountFromCategoryAndItsChildrenByCategoryId, { id: categoryId })
    );
  }

  public productsFromCategoryByStructuralNode$(structuralNode: StructuralNode): Observable<Product[]> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsFromCategoryByStructuralNode(structuralNode))
    );
  }
}
