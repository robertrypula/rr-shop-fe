import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBarActions from '../actions/bar.actions';
import { Bar, BarType } from '../../models/bar.model';
import { barId } from '../reducers/bar.reducers';
import * as fromBarSelectors from '../selectors/bar.selectors';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class BarFacadeService {
  public bars$: Observable<Bar[]> = this.store.pipe(select(fromBarSelectors.selectBars));

  public constructor(protected store: Store<State>) {}

  public show(message: string, barType: BarType): void {
    this.store.dispatch(fromBarActions.show({ message, barType }));
  }

  public getLastId(): number {
    return barId;
  }

  public close(id: number): void {
    this.store.dispatch(fromBarActions.close({ id }));
  }
}
