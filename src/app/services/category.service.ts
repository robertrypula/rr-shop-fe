import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';

import { ViewportService } from './viewport.service';
import { map, switchMap } from 'rxjs/operators';
import { Device } from '../models/viewport.model';
import { CategoryFacadeService } from '../store/facades/category-facade.service';
import { Category, ActiveLevelUpdateEntry, StructuralNode } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;
  public categoriesWithActiveLevelSorted$: Observable<Category[]>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected viewportService: ViewportService
  ) {
    this.activeLevelUpdateEntriesBasedOnRoute$ = categoryFacadeService.activeLevelUpdateEntriesBasedOnRoute$;
    this.categoriesWithActiveLevelSorted$ = categoryFacadeService.categoriesWithActiveLevelSorted$;
    this.isListCollapsed$ = categoryFacadeService.isListCollapsed$;
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

  public setIsCollapsed(newValue: boolean): void {
    this.categoryFacadeService.setIsCollapsed(newValue);
  }

  protected setupObservables(): void {
    this.isCollapseExpandButtonVisible$ = this.viewportService.device$.pipe(
      switchMap((device: Device): Observable<boolean> => of([Device.MobileVertical, Device.Mobile].includes(device)))
    );
    // TODO move somewhere
    /* combineLatest([this.isCollapseExpandButtonVisible$, this.isCollapsedSubject$]).pipe(
      map(([isCollapseExpandButtonVisible, isCollapsed]): boolean =>
        isCollapseExpandButtonVisible ? isCollapsed : false
      )
    );*/
  }
}
