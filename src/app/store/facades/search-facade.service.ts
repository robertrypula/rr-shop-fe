import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromSearchActions from '../actions/search.actions';
import * as fromSearchCoreSelectors from '../selectors/search-core.selectors';
import * as fromSearchSelectors from '../selectors/search.selectors';

@Injectable({
  providedIn: 'root'
})
export class SearchFacadeService {
  public isOnSearchRoute$: Observable<boolean> = this.store.pipe(select(fromSearchSelectors.selectIsOnSearchRoute));
  public query$: Observable<string> = this.store.pipe(select(fromSearchCoreSelectors.selectQuery));

  public constructor(protected store: Store<State>) {}

  public setQuery(query: string): void {
    this.store.dispatch(fromSearchActions.setQuery({ query }));
  }
}
