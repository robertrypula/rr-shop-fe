import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers';

import * as fromViewportActions from '../actions/viewport.actions';
import * as fromViewportSelectors from '../selectors/viewport.selectors';
import { Device } from '../../models/viewport.model';

@Injectable({
  providedIn: 'root'
})
export class ViewportFacadeService {
  public device$: Observable<Device>;
  public getFurtherNavigationIdOnlyAtSmallerDevices$: Observable<number>;
  public isScrolledDownThatHeaderIsNotVisible$: Observable<boolean>;
  public isSmallDevice$: Observable<boolean>;

  public constructor(protected store: Store<State>) {
    this.device$ = store.pipe(select(fromViewportSelectors.selectDevice));
    this.getFurtherNavigationIdOnlyAtSmallerDevices$ = store.pipe(
      select(fromViewportSelectors.selectGetFurtherNavigationIdOnlyAtSmallerDevices)
    );
    this.isScrolledDownThatHeaderIsNotVisible$ = store.pipe(
      select(fromViewportSelectors.selectIsScrolledDownThatHeaderIsNotVisible)
    );
    this.isSmallDevice$ = store.pipe(select(fromViewportSelectors.selectIsSmallDevice));
  }

  public setDevice(newValue: Device): void {
    this.store.dispatch(fromViewportActions.setDevice({ newValue }));
  }

  public setIsScrolledDownThatHeaderIsNotVisible(newValue: boolean): void {
    this.store.dispatch(fromViewportActions.setIsScrolledDownThatHeaderIsNotVisible({ newValue }));
  }
}
