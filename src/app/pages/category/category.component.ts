import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromReducers from '../../store/reducers';
import * as fromProductSelectors from '../../store/selectors/product.selectors';
import { Product } from '../../models/product.model';
import { addProduct } from '../../store/actions/basket.actions';

@Component({
  selector: 'rr-shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public text$: Observable<string>;
  public products$: Observable<Product[]>;

  public constructor(protected activatedRoute: ActivatedRoute, protected store: Store<fromReducers.State>) {}

  public ngOnInit(): void {
    this.text$ = this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap) => this.getDelayed(params.get('id'))));
    this.products$ = this.store.pipe(select(fromProductSelectors.selectProducts));
  }

  public getDelayed(id: string): Observable<string> {
    return of(`Loaded category: ${id}`).pipe(delay(250));
  }

  public addToBasket(product: Product): void {
    this.store.dispatch(addProduct({ productId: product.id }));
  }
}
