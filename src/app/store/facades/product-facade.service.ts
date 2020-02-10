import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Product } from '../../models/product.model';
import * as fromSelectors from '../selectors/product.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  public constructor(protected store: Store<State>) {}

  public productsByCategoryId$(categoryId: number): Observable<Product[]> {
    return this.store.pipe(select(fromSelectors.selectProducts, { categoryId }));
  }

  public productsFromActiveCategory$(): Observable<Product[]> {
    return this.store.pipe(select(fromSelectors.selectProductsFromActiveCategory));
  }
}
