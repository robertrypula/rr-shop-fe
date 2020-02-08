import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';

import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { ViewportService } from './viewport.service';
import { map, switchMap } from 'rxjs/operators';
import { Device } from '../models/viewport.model';
import { CategoryFacadeService } from '../store/facades/category-facade.service';
import { Category, StructuralNode } from '../models/category.model';
import { getCategoryId } from '../utils/routing.util';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  protected isCollapsedSubject$: Subject<boolean> = new BehaviorSubject(false);

  public constructor(
    protected productService: ProductService,
    protected categoryFacadeService: CategoryFacadeService,
    protected viewportService: ViewportService
  ) {
    this.setupObservables();
  }

  public categoryByStructuralNode$(structuralNode: StructuralNode): Observable<Category> {
    return this.categoryFacadeService.categoryByStructuralNode$(structuralNode);
  }

  public categoryByParentId$(id: number): Observable<Category> {
    return this.categoryFacadeService.categoryByParentId$(id);
  }

  public categoriesByStructuralNode$(structuralNode: StructuralNode): Observable<Category[]> {
    return this.categoryFacadeService.categoriesByStructuralNode$(structuralNode);
  }

  public categoriesByParentId$(parentId: number): Observable<Category[]> {
    return this.categoryFacadeService.categoriesByParentId$(parentId);
  }

  public collapse(): void {
    this.isCollapsedSubject$.next(true);
  }

  public expand(): void {
    this.isCollapsedSubject$.next(false);
  }

  public productsByCategoryIdWithSlug$(categoryIdWithSlug: string): Observable<Product[]> {
    return this.productService.productsByCategoryId$(getCategoryId(categoryIdWithSlug));
  }

  public setActiveCategory(id: number): void {
    const categoriesWithActiveLevel: Category[] = this.categoryFacadeService.getCategoriesWithActiveLevel();
    const categoriesUpToRoot: Category[] = [];

    categoriesWithActiveLevel.forEach((categoryWithActiveLevel: Category): void => {
      this.categoryFacadeService.setActiveLevel(categoryWithActiveLevel.id, null);
    });
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
