import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';

import * as fromCategoryActions from '../actions/category.actions';
import * as fromCategorySelectors from '../selectors/category.selectors';
import { Category, ActiveLevelUpdateEntry, StructuralNode } from '../../models/category.model';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacadeService {
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;
  public categoriesWithActiveLevelSorted$: Observable<Category[]>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  public constructor(protected store: Store<State>) {
    this.activeLevelUpdateEntriesBasedOnRoute$ = this.store.pipe(
      select(fromCategorySelectors.selectActiveLevelUpdateEntriesBasedOnRoute)
    );
    this.categoriesWithActiveLevelSorted$ = this.getCategoriesWithActiveLevelSorted$();
    this.isCollapseExpandButtonVisible$ = this.store.pipe(
      select(fromCategorySelectors.selectIsCollapseExpandButtonVisible)
    );
    this.isListCollapsed$ = this.store.pipe(select(fromCategorySelectors.selectIsListCollapsed));
  }

  public activeCategory$(): Observable<Category> {
    return this.store.pipe(select(fromCategorySelectors.selectActiveCategory));
  }

  public categoryByStructuralNode$(structuralNode: StructuralNode): Observable<Category> {
    return this.store.pipe(select(fromCategorySelectors.selectCategory, { structuralNode }));
  }

  public categoryById$(id: number): Observable<Category> {
    return this.store.pipe(select(fromCategorySelectors.selectCategory, { id }));
  }

  public categoriesByStructuralNode$(structuralNode: StructuralNode): Observable<Category[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoriesBy, { structuralNode }));
  }

  public categoriesByParentId$(parentId: number): Observable<Category[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoriesBy, { parentId }));
  }

  public getCategoryById(id: number): Category {
    let result: Category = null;

    this.store
      .pipe(
        select(fromCategorySelectors.selectCategory, { id }),
        take(1),
        tap((category: Category): void => {
          result = category;
        })
      )
      .subscribe();

    return result;
  }

  public getCategoriesWithActiveLevelSorted$(): Observable<Category[]> {
    return this.store.pipe(
      select(fromCategorySelectors.selectCategoriesWithActiveLevel),
      map((categoriesWithActiveLevel: Category[]): Category[] => {
        return categoriesWithActiveLevel.sort((a: Category, b: Category): number =>
          a.activeLevel === b.activeLevel ? 0 : a.activeLevel < b.activeLevel ? 1 : -1
        );
      })
    );
  }

  public setIsCollapsed(newValue: boolean): void {
    this.store.dispatch(fromCategoryActions.setIsListCollapsed({ newValue }));
  }
}
