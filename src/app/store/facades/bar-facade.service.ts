import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Bar } from '../../models/bar.model';
import * as fromActions from '../actions/bar.actions';
import * as fromSelectors from '../selectors/bar.selectors';
import { barId } from '../reducers/bar.reducers';

@Injectable({
  providedIn: 'root'
})
export class BarFacadeService {
  public bars$: Observable<Bar[]>;

  public constructor(protected store: Store<State>) {
    this.bars$ = store.pipe(select(fromSelectors.selectBars));
  }

  public showSuccess(message: string): void {
    this.store.dispatch(fromActions.showSuccess({ message }));
  }

  public getLastId(): number {
    return barId;
  }

  public close(id: number): void {
    this.store.dispatch(fromActions.close({ id }));
  }
}