import { NgModule, Optional, Self } from '@angular/core';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';

import { CustomRouterStateSerializer } from './store/reducers/router.reducers';

export const routerStateConfig = {
  stateKey: 'router',
  serializer: CustomRouterStateSerializer
};

@NgModule({
  imports: [
    StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
  ],
  exports: [
    StoreModule,
    StoreRouterConnectingModule
  ]
})
export class NgrxRouterStoreModule {
  public constructor(@Self() @Optional() router: Router) {
    if (router) {
      console.log('All good, NgrxRouterStoreModule');
    } else {
      console.error('NgrxRouterStoreModule must be imported in the same same level as RouterModule');
    }
  }
}
