import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCategoryStoreLength, selectIsListCollapsed } from '../selectors/category-core.selectors';
import * as fromCategoryActions from '../actions/category.actions';
import { ActiveLevelUpdateEntry, CategoryStore, StructuralNode } from '../../models/category.model';
import * as fromCategorySelectors from '../selectors/category.selectors';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacadeService {
  // TODO when 'Category' class will be implemented rename variables
  public activeCategory$: Observable<CategoryStore> = this.store.pipe(
    select(fromCategorySelectors.selectActiveCategoryStore)
  );
  public activeCategoryChildren$: Observable<CategoryStore[]> = this.store.pipe(
    select(fromCategorySelectors.selectActiveCategoryStoreChildren)
  );
  public activeCategoryAndItsChildren$: Observable<CategoryStore[]> = this.store.pipe(
    select(fromCategorySelectors.selectActiveCategoryStoreAndItsChildren)
  );
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]> = this.store.pipe(
    select(fromCategorySelectors.selectActiveLevelUpdateEntriesBasedOnRoute)
  );
  public categoriesWithActiveLevelSorted$: Observable<CategoryStore[]> = this.store.pipe(
    select(fromCategorySelectors.selectCategoriesStoreWithActiveLevelSorted)
  );
  public categoryLength$: Observable<number> = this.store.pipe(select(selectCategoryStoreLength));
  public isCollapseExpandButtonVisible$: Observable<boolean> = this.store.pipe(
    select(fromCategorySelectors.selectIsCollapseExpandButtonVisible)
  );
  public isListCollapsed$: Observable<boolean> = this.store.pipe(select(selectIsListCollapsed));
  public shouldCallForProducts$: Observable<boolean> = this.store.pipe(
    select(fromCategorySelectors.selectShouldCallForProducts)
  );

  public constructor(protected store: Store<State>) {}

  public categoryByCategoryId$(categoryId: number): Observable<CategoryStore> {
    return this.store.pipe(select(fromCategorySelectors.selectCategoryStore, { categoryId }));
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
