import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';

import * as fromCategoryActions from '../actions/category.actions';
import * as fromCategorySelectors from '../selectors/category.selectors';
import { Category, ActiveLevelUpdateEntry, StructuralNode } from '../../models/category.model';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacadeService {
  public activeCategory$: Observable<Category>;
  public activeCategoryAndItsChildren$: Observable<Category[]>;
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;
  public categoriesWithActiveLevelSorted$: Observable<Category[]>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  public constructor(protected store: Store<State>) {
    this.activeCategory$ = this.store.pipe(select(fromCategorySelectors.selectActiveCategory));
    this.activeCategoryAndItsChildren$ = this.store.pipe(
      select(fromCategorySelectors.selectActiveCategoryAndItsChildren)
    );
    this.activeLevelUpdateEntriesBasedOnRoute$ = this.store.pipe(
      select(fromCategorySelectors.selectActiveLevelUpdateEntriesBasedOnRoute)
    );
    this.categoriesWithActiveLevelSorted$ = this.store.pipe(
      select(fromCategorySelectors.selectCategoriesWithActiveLevelSorted)
    );
    this.isCollapseExpandButtonVisible$ = this.store.pipe(
      select(fromCategorySelectors.selectIsCollapseExpandButtonVisible)
    );
    this.isListCollapsed$ = this.store.pipe(select(fromCategorySelectors.selectIsListCollapsed));
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

  public setIsCollapsed(newValue: boolean): void {
    this.store.dispatch(fromCategoryActions.setIsListCollapsed({ newValue }));
  }
}
