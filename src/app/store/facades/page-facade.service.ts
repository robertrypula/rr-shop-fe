import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { State } from '../reducers';
import * as fromPageSelectors from '../selectors/page.selectors';
import { Observable } from 'rxjs';
import { CategoryStore } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class PageFacadeService {
  public isLoadingOverlayVisible$: Observable<boolean> = this.store.pipe(
    select(fromPageSelectors.selectIsLoadingOverlayVisible)
  );
  public isOnMainPageRoute$: Observable<boolean> = this.store.pipe(select(fromPageSelectors.selectIsOnMainPageRoute));

  public mainPageSectionsCategories$: Observable<CategoryStore[]> = this.store.pipe(
    select(fromPageSelectors.selectMainPageSectionsCategories)
  );

  public constructor(protected store: Store<State>) {}
}
