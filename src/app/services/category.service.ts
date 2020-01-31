import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { ViewportService } from './viewport.service';
import { map, switchMap } from 'rxjs/operators';
import { Device } from '../models/viewport.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  protected isCollapsedSubject$: Subject<boolean> = new BehaviorSubject(false);

  public constructor(protected productService: ProductService, protected viewportService: ViewportService) {
    this.setupObservables();
  }

  public productsByCategoryIdWithSlug$(categoryIdWithSlug: string): Observable<Product[]> {
    const categoryIdWithSlugSplit: string[] = categoryIdWithSlug.split(',');
    const categoryId: number = categoryIdWithSlugSplit.length === 2 ? +categoryIdWithSlugSplit[0] : null;

    return this.productService.productsByCategoryId$(categoryId);
  }

  public collapse(): void {
    this.isCollapsedSubject$.next(true);
  }

  public expand(): void {
    this.isCollapsedSubject$.next(false);
  }

  protected setupObservables(): void {
    this.isCollapseExpandButtonVisible$ = this.viewportService.device$.pipe(
      switchMap((device: Device): Observable<boolean> => of([Device.MobileVertical, Device.Mobile].includes(device)))
    );
    this.isListCollapsed$ = combineLatest([this.isCollapseExpandButtonVisible$, this.isCollapsedSubject$]).pipe(
      map(([isCollapseExpandButtonVisible, isCollapsed]): boolean =>
        isCollapseExpandButtonVisible ? isCollapsed : false
      )
    );
  }
}
