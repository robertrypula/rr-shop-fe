import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromPageSelectors from '../selectors/page.selectors';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class PageFacadeService {
  public isLoadingOverlayVisible$: Observable<boolean> = this.store.pipe(
    select(fromPageSelectors.selectIsLoadingOverlayVisible)
  );
  public isOnMainPageRoute$: Observable<boolean> = this.store.pipe(select(fromPageSelectors.selectIsOnMainPageRoute));

  public constructor(protected store: Store<State>) {}
}
