import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromReducers from '../../store/reducers'; // TODO remove
import * as fromProductSelectors from '../../store/selectors/product.selectors'; // TODO remove
import { Product } from '../../models/product.model';
import { add } from '../../store/actions/basket.actions';
import { CategoryService } from './category.service';

@Component({
  selector: 'rr-shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  public text$: Observable<string>;
  public products$: Observable<Product[]>;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected store: Store<fromReducers.State>, // TODO remove
    protected categoryService: CategoryService
  ) {}

  public ngOnInit(): void {
    this.text$ = this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap) => this.getDelayed(params.get('id'))));
    this.products$ = this.store.pipe(select(fromProductSelectors.selectProducts)); // TODO remove
  }

  public getDelayed(id: string): Observable<string> {
    return of(`Loaded category: ${id}`).pipe(delay(250));
  }

  public addToBasket(product: Product): void {
    this.store.dispatch(add({ id: product.id, quantity: 1 })); // TODO remove
    this.categoryService.addToBasket(product);
  }
}
