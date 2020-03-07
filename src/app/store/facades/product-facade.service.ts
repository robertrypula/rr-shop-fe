import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Product, ProductEnriched } from '../../models/product.model';
import * as fromProductSelectors from '../selectors/product.selectors';
import { selectProductsLength } from '../selectors/product-core.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  public activeProduct$: Observable<Product>;
  public activeProductId$: Observable<number>;
  public isOnProductRoute$: Observable<boolean>;
  public productsEnrichedFromActiveCategoryAndItsChildren$: Observable<ProductEnriched[]>;
  public productsLength$: Observable<number>;

  public constructor(protected store: Store<State>) {
    this.activeProduct$ = this.store.pipe(select(fromProductSelectors.selectActiveProduct));
    this.activeProductId$ = this.store.pipe(select(fromProductSelectors.selectActiveProductId));
    this.isOnProductRoute$ = this.store.pipe(select(fromProductSelectors.selectIsOnProductRoute));
    this.productsEnrichedFromActiveCategoryAndItsChildren$ = this.store.pipe(
      select(fromProductSelectors.selectProductsEnrichedFromActiveCategoryAndItsChildren)
    );
    this.productsLength$ = this.store.pipe(select(selectProductsLength));
  }

  public productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId: number): Observable<number> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsCountFromCategoryAndItsChildrenByCategoryId, { id: categoryId })
    );
  }
}
