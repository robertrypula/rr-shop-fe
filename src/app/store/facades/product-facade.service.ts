import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Product } from '../../models/product.model';
import * as fromProductSelectors from '../selectors/product.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  public activeProductId$: Observable<number>;
  public isOnProductRoute$: Observable<boolean>;
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]>;
  public productsLength$: Observable<number>;

  public constructor(protected store: Store<State>) {
    this.activeProductId$ = this.store.pipe(select(fromProductSelectors.selectActiveProductId));
    this.isOnProductRoute$ = this.store.pipe(select(fromProductSelectors.selectIsOnProductRoute));
    this.productsFromActiveCategoryAndItsChildren$ = this.store.pipe(
      select(fromProductSelectors.selectProductsFromActiveCategoryAndItsChildren)
    );
    this.productsLength$ = this.store.pipe(select(fromProductSelectors.selectProductsLength));
  }

  public productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId: number): Observable<number> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsCountFromCategoryAndItsChildrenByCategoryId, { id: categoryId })
    );
  }
}
