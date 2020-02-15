import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';

import { ViewportService } from './viewport.service';
import { map, switchMap } from 'rxjs/operators';
import { Device } from '../models/viewport.model';
import { CategoryFacadeService } from '../store/facades/category-facade.service';
import { Category, ActiveLevelUpdateEntry, StructuralNode } from '../models/category.model';
import { BREADCRUMBS_STRUCTURAL_NODES_LIMIT } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;
  public categoriesWithActiveLevelSorted$: Observable<Category[]>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  protected isCollapsedSubject$: Subject<boolean> = new BehaviorSubject(false);

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected viewportService: ViewportService
  ) {
    this.activeLevelUpdateEntriesBasedOnRoute$ = categoryFacadeService.activeLevelUpdateEntriesBasedOnRoute$;
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

  public getActiveLevelUpdateEntriesBasedOnRoute(): ActiveLevelUpdateEntry[] {
    return this.categoryFacadeService.getActiveLevelUpdateEntriesBasedOnRoute();
  }

  public loadCategories(): void {
    this.categoryFacadeService.loadCategories();
  }

  public setActiveLevel(activeLevelUpdateEntries: ActiveLevelUpdateEntry[]): void {
    this.categoryFacadeService.setActiveLevel(activeLevelUpdateEntries);
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
