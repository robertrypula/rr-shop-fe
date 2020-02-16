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
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]>;

  public constructor(protected store: Store<State>) {
    this.productsFromActiveCategoryAndItsChildren$ = this.store.pipe(
      select(fromProductSelectors.selectProductsFromActiveCategoryAndItsChildren)
    );
  }

  public productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId: number): Observable<number> {
    return this.store.pipe(
      select(fromProductSelectors.selectProductsCountFromCategoryAndItsChildrenByCategoryId, { id: categoryId })
    );
  }
}
