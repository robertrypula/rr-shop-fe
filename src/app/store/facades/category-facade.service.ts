import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromCategoryActions from '../actions/category.actions';
import * as fromCategorySelectors from '../selectors/category.selectors';
import { ActiveLevelUpdateEntry, CategoryStore, StructuralNode } from '../../models/category.model';
import { State } from '../reducers';
import { selectCategoryStoreLength, selectIsListCollapsed } from '../selectors/category-core.selectors';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacadeService {
  // TODO when 'Category' class will be implemented rename variables
  public activeCategory$: Observable<CategoryStore>;
  public activeCategoryAndItsChildren$: Observable<CategoryStore[]>;
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;
  public categoriesWithActiveLevelSorted$: Observable<CategoryStore[]>;
  public categoryLength$: Observable<number>;
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;
  public isOnCategoryRoute$: Observable<boolean>;

  public constructor(protected store: Store<State>) {
    this.activeCategory$ = this.store.pipe(select(fromCategorySelectors.selectActiveCategoryStore));
    this.activeCategoryAndItsChildren$ = this.store.pipe(
      select(fromCategorySelectors.selectActiveCategoryAndItsChildren)
    );
    this.activeLevelUpdateEntriesBasedOnRoute$ = this.store.pipe(
      select(fromCategorySelectors.selectActiveLevelUpdateEntriesBasedOnRoute)
    );
    this.categoriesWithActiveLevelSorted$ = this.store.pipe(
      select(fromCategorySelectors.selectCategoriesWithActiveLevelSorted)
    );
    this.categoryLength$ = this.store.pipe(select(selectCategoryStoreLength));
    this.isCollapseExpandButtonVisible$ = this.store.pipe(
      select(fromCategorySelectors.selectIsCollapseExpandButtonVisible)
    );
    this.isListCollapsed$ = this.store.pipe(select(selectIsListCollapsed));
    this.isOnCategoryRoute$ = this.store.pipe(select(fromCategorySelectors.selectIsOnCategoryRoute));
  }

  public categoryByStructuralNode$(structuralNode: StructuralNode): Observable<CategoryStore> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoryStore, { structuralNode }));
  }

  public categoriesByStructuralNode$(structuralNode: StructuralNode): Observable<CategoryStore[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoriesStoreBy, { structuralNode }));
  }

  public categoriesByParentId$(parentId: number): Observable<CategoryStore[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoriesStoreBy, { parentId }));
  }

  public setIsCollapsed(newValue: boolean): void {
    this.store.dispatch(fromCategoryActions.setIsListCollapsed({ newValue }));
  }
}
