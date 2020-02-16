import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class ViewportEffects {
  public constructor(private actions$: Actions) {}
}
