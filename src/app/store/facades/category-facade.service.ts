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
  public activeCategory$: Observable<CategoryStore> = this.store.pipe(
    select(fromCategorySelectors.selectActiveCategoryStore)
  );
  public activeCategoryAndItsChildren$: Observable<CategoryStore[]> = this.store.pipe(
    select(fromCategorySelectors.selectActiveCategoryAndItsChildren)
  );
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]> = this.store.pipe(
    select(fromCategorySelectors.selectActiveLevelUpdateEntriesBasedOnRoute)
  );
  public categoriesWithActiveLevelSorted$: Observable<CategoryStore[]> = this.store.pipe(
    select(fromCategorySelectors.selectCategoriesWithActiveLevelSorted)
  );
  public categoryLength$: Observable<number> = this.store.pipe(select(selectCategoryStoreLength));
  public isCollapseExpandButtonVisible$: Observable<boolean> = this.store.pipe(
    select(fromCategorySelectors.selectIsCollapseExpandButtonVisible)
  );
  public isListCollapsed$: Observable<boolean> = this.store.pipe(select(selectIsListCollapsed));
  public isOnCategoryRoute$: Observable<boolean> = this.store.pipe(
    select(fromCategorySelectors.selectIsOnCategoryRoute)
  );

  public constructor(protected store: Store<State>) {}

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
