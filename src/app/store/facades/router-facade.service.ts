import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { State } from '../reducers';
import * as fromSelectors from '../selectors/router.selectors';

@Injectable({
  providedIn: 'root'
})
export class RouterFacadeService {
  public navigationId$: Observable<number>;
  public url$: Observable<string>;

  public constructor(protected store: Store<State>) {
    this.navigationId$ = store.pipe(select(fromSelectors.selectNavigationId));
    this.url$ = store.pipe(select(fromSelectors.selectUrl));
  }
}
