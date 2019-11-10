import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { metaReducers, reducers } from '../store/reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ]
})
export class CoreModule {}
