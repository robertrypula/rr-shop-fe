import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { State } from '../reducers';
import * as fromPageSelectors from '../selectors/page.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageFacadeService {
  public isLoadingOverlayVisible$: Observable<boolean>;

  public constructor(protected store: Store<State>) {
    this.isLoadingOverlayVisible$ = store.pipe(select(fromPageSelectors.selectIsLoadingOverlayVisible));
  }
}
