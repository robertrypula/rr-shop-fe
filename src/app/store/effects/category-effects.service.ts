import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { effectTest, setActiveLevel } from '../actions/category.actions';

@Injectable()
export class CategoryEffects {
  public loadTest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setActiveLevel),
      mergeMap(() =>
        of([1, 2, 3]).pipe(
          map(dataTest => effectTest({ dataTest })),
          tap(test => console.log(test)),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public constructor(private actions$: Actions) {}
}
