import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromSelectors from '../selectors/category.selectors';
import { Category, StructuralNode } from '../../models/category.model';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class CategoryFacadeService {
  public constructor(protected store: Store<State>) {}

  public categoriesByStructuralNode$(structuralNode: StructuralNode): Observable<Category[]> {
    return this.store.pipe(select(fromSelectors.selectCategories, { structuralNode }));
  }

  public categoriesByParentId$(parentId: number): Observable<Category[]> {
    return this.store.pipe(select(fromSelectors.selectCategories, { parentId }));
  }
}
