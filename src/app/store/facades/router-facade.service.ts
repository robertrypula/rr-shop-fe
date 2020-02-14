import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { State } from '../reducers';
import * as fromSelectors from '../selectors/router.selectors';

@Injectable({
  providedIn: 'root'
})
export class RouterFacadeService {
  public constructor(protected store: Store<State>) {}

  public url$(): Observable<string> {
    return this.store.pipe(select(fromSelectors.selectUrl));
  }
}
