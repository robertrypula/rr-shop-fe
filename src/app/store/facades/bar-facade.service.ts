import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import { Bar } from '../../models/bar.model';
import { close, showSuccess } from '../actions/bar.actions';
import { selectBars } from '../selectors/bar.selectors';
import { barId as lastId } from '../reducers/bar.reducers';

@Injectable({
  providedIn: 'root'
})
export class BarFacadeService {
  public bars$: Observable<Bar[]>;

  public constructor(protected store: Store<State>) {
    this.bars$ = store.pipe(select(selectBars));
  }

  public showSuccess(message: string): void {
    this.store.dispatch(showSuccess({ message }));
  }

  public getLastId(): number {
    return lastId;
  }

  public close(id: number): void {
    this.store.dispatch(close({ id }));
  }
}
