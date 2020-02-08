import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromCategoryActions from '../actions/category.actions';
import * as fromCategorySelectors from '../selectors/category.selectors';
import { Category, StructuralNode } from '../../models/category.model';
import { State } from '../reducers';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacadeService {
  public categoriesWithActiveLevelSorted$: Observable<Category[]>;

  public constructor(protected store: Store<State>) {
    this.categoriesWithActiveLevelSorted$ = this.getCategoriesWithActiveLevelSorted$();
  }

  public categoryByStructuralNode$(structuralNode: StructuralNode): Observable<Category> {
    return this.store.pipe(select(fromCategorySelectors.selectCategory, { structuralNode }));
  }

  public categoryById$(id: number): Observable<Category> {
    return this.store.pipe(select(fromCategorySelectors.selectCategory, { id }));
  }

  public categoriesByStructuralNode$(structuralNode: StructuralNode): Observable<Category[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategories, { structuralNode }));
  }

  public categoriesByParentId$(parentId: number): Observable<Category[]> {
    return this.store.pipe(select(fromCategorySelectors.selectCategories, { parentId }));
  }

  public getCategoriesWithActiveLevel(): Category[] {
    let result: Category[] = [];

    this.store
      .pipe(
        select(fromCategorySelectors.selectCategoriesWithActiveLevel),
        take(1),
        tap((categories: Category[]): void => {
          result = categories;
        })
      )
      .subscribe();

    return result;
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

  public setActiveLevel(id: number, activeLevel: number): void {
    this.store.dispatch(fromCategoryActions.setActiveLevel({ id, activeLevel }));
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
}
