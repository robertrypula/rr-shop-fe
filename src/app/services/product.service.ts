import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductFacadeService } from '../store/facades/product-facade.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public constructor(protected productFacadeService: ProductFacadeService) {}

  public productsByCategoryId$(categoryId: number): Observable<Product[]> {
    return this.productFacadeService.productsByCategoryId$(categoryId);
  }
}
