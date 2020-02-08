import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Bar } from '../../models/bar.model';
import * as fromBarActions from '../actions/bar.actions';
import * as fromBarSelectors from '../selectors/bar.selectors';
import { barId } from '../reducers/bar.reducers';

@Injectable({
  providedIn: 'root'
})
export class BarFacadeService {
  public bars$: Observable<Bar[]>;

  public constructor(protected store: Store<State>) {
    this.bars$ = store.pipe(select(fromBarSelectors.selectBars));
  }

  public showSuccess(message: string): void {
    this.store.dispatch(fromBarActions.showSuccess({ message }));
  }

  public getLastId(): number {
    return barId;
  }

  public close(id: number): void {
    this.store.dispatch(fromBarActions.close({ id }));
  }
}
