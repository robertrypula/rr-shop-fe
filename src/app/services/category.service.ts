import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public constructor(protected productService: ProductService) {}

  public productsByCategoryIdWithSlug$(categoryIdWithSlug: string): Observable<Product[]> {
    const categoryIdWithSlugSplit: string[] = categoryIdWithSlug.split(',');
    const categoryId: number = categoryIdWithSlugSplit.length === 2 ? +categoryIdWithSlugSplit[0] : null;

    return this.productService.productsByCategoryId$(categoryId);
  }
}
