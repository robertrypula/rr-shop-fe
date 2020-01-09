import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'rr-shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  public products$: Observable<Product[]>;

  public constructor(protected activatedRoute: ActivatedRoute, protected categoryService: CategoryService) {}

  public ngOnInit(): void {
    this.products$ = this.activatedRoute.paramMap.pipe(
      switchMap(
        (paramMap: ParamMap): Observable<Product[]> =>
          this.categoryService.productsByCategoryIdWithSlug$(paramMap.get('categoryIdWithSlug'))
      )
    );
  }
}
