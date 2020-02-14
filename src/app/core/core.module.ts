import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { CategoryEffects } from '../store/effects/category-effects.service';
import { metaReducers, reducers } from '../store/reducers';
import { environment } from '../../environments/environment';
import { routerStateConfig } from '../store/reducers/router.reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
    EffectsModule.forRoot([CategoryEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class CoreModule {}
