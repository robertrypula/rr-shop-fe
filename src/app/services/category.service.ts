import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../store/facades/category-facade.service';
import { Category, ActiveLevelUpdateEntry, StructuralNode } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public activeCategory$: Observable<Category>;
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;
  public categoriesWithActiveLevelSorted$: Observable<Category[]>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {
    this.activeCategory$ = categoryFacadeService.activeCategory$;
    this.activeLevelUpdateEntriesBasedOnRoute$ = categoryFacadeService.activeLevelUpdateEntriesBasedOnRoute$;
    this.categoriesWithActiveLevelSorted$ = categoryFacadeService.categoriesWithActiveLevelSorted$;
    this.isCollapseExpandButtonVisible$ = categoryFacadeService.isCollapseExpandButtonVisible$;
    this.isListCollapsed$ = categoryFacadeService.isListCollapsed$;
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
}
