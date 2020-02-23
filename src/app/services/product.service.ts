import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductFacadeService } from '../store/facades/product-facade.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public activeProduct$: Observable<Product>;
  public productsFromActiveCategoryAndItsChildren$: Observable<Product[]>;

  public constructor(protected productFacadeService: ProductFacadeService) {
    this.activeProduct$ = productFacadeService.activeProduct$;
    this.productsFromActiveCategoryAndItsChildren$ = productFacadeService.productsFromActiveCategoryAndItsChildren$;
  }

  public productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId: number): Observable<number> {
    return this.productFacadeService.productsCountFromCategoryAndItsChildrenByCategoryId$(categoryId);
  }
}
