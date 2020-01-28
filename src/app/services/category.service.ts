import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { ViewportService } from './viewport.service';
import { switchMap } from 'rxjs/operators';
import { Device } from '../models/viewport.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public isCategoryBoxCollapsed$: Observable<boolean> = new Observable();

  public constructor(protected productService: ProductService, protected viewportService: ViewportService) {
    this.isCategoryBoxCollapsed$ = viewportService.device$.pipe(
      switchMap((device: Device): Observable<boolean> => of(device === Device.DesktopLarge))
    );
  }

  public productsByCategoryIdWithSlug$(categoryIdWithSlug: string): Observable<Product[]> {
    const categoryIdWithSlugSplit: string[] = categoryIdWithSlug.split(',');
    const categoryId: number = categoryIdWithSlugSplit.length === 2 ? +categoryIdWithSlugSplit[0] : null;

    return this.productService.productsByCategoryId$(categoryId);
  }
}
