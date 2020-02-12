import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';

import { ViewportService } from './viewport.service';
import { map, switchMap } from 'rxjs/operators';
import { Device } from '../models/viewport.model';
import { CategoryFacadeService } from '../store/facades/category-facade.service';
import { Category, CategorySetActiveLevel, StructuralNode } from '../models/category.model';
import { BREADCRUMBS_STRUCTURAL_NODES_LIMIT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categoriesWithActiveLevelSorted$: Observable<Category[]>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  protected isCollapsedSubject$: Subject<boolean> = new BehaviorSubject(false);

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected viewportService: ViewportService
  ) {
    this.categoriesWithActiveLevelSorted$ = categoryFacadeService.categoriesWithActiveLevelSorted$;
    this.setupObservables();
  }

  public activeCategory$(): Observable<Category> {
    return this.categoryFacadeService.activeCategory$();
  }

  public categoryByStructuralNode$(structuralNode: StructuralNode): Observable<Category> {
    return this.categoryFacadeService.categoryByStructuralNode$(structuralNode);
  }

  public categoryById$(id: number): Observable<Category> {
    return this.categoryFacadeService.categoryById$(id);
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

  public getCategoriesFromLeafToRoot(
    leafId: number,
    structuralNodeLimit: StructuralNode[] = BREADCRUMBS_STRUCTURAL_NODES_LIMIT
  ): Category[] {
    const categoriesFromLeafToRoot: Category[] = [];
    let category: Category;
    let id: number = leafId;

    while (true) {
      category = this.categoryFacadeService.getCategoryById(id);
      if (!category || structuralNodeLimit.includes(category.structuralNode)) {
        break;
      }
      categoriesFromLeafToRoot.push(category);
      id = category.parentId;
    }

    return categoriesFromLeafToRoot;
  }

  public loadCategories(): void {
    this.categoryFacadeService.loadCategories();
  }

  public setActiveCategory(id: number): void {
    const categoriesWithActiveLevel: Category[] = this.categoryFacadeService.getCategoriesWithActiveLevel();
    const categoriesFromLeafToRoot: Category[] = this.getCategoriesFromLeafToRoot(id);
    const categorySetActiveLevels: CategorySetActiveLevel[] = [];

    categoriesWithActiveLevel.forEach((categoryWithActiveLevel: Category): void => {
      categorySetActiveLevels.push({ id: categoryWithActiveLevel.id, activeLevel: null });
    });
    categoriesFromLeafToRoot.forEach((categoryWithActiveLevel: Category, index: number): void => {
      categorySetActiveLevels.push({ id: categoryWithActiveLevel.id, activeLevel: index + 1 });
    });

    this.categoryFacadeService.setActiveLevel(categorySetActiveLevels);
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
