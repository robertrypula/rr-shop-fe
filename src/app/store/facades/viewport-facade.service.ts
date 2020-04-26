import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromViewportActions from '../actions/viewport.actions';
import { Device } from '../../models/viewport.model';
import * as fromViewportSelectors from '../selectors/viewport.selectors';

@Injectable({
  providedIn: 'root'
})
export class ViewportFacadeService {
  public device$: Observable<Device> = this.store.pipe(select(fromViewportSelectors.selectDevice));
  public getFurtherNavigationIdOnlyAtSmallerDevices$: Observable<number> = this.store.pipe(
    select(fromViewportSelectors.selectGetFurtherNavigationIdOnlyAtSmallerDevices)
  );
  public isScrolledDownThatHeaderIsNotVisible$: Observable<boolean> = this.store.pipe(
    select(fromViewportSelectors.selectIsScrolledDownThatHeaderIsNotVisible)
  );

  public constructor(protected store: Store<State>) {}

  public setDevice(newValue: Device): void {
    this.store.dispatch(fromViewportActions.setDevice({ newValue }));
  }

  public setIsScrolledDownThatHeaderIsNotVisible(newValue: boolean): void {
    this.store.dispatch(fromViewportActions.setIsScrolledDownThatHeaderIsNotVisible({ newValue }));
  }
}
