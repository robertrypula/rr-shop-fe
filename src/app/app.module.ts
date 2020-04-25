import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './admin/rest-api/auth.interceptor';
import { CategoryEffects } from './store/effects/category-effects.service';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './store/reducers';
import { OrderEffects } from './store/effects/order-effects.service';
import { ProductsEffects } from './store/effects/products-effects.service';
import { RootComponent } from './containers/root/root.component';
import { RootModule } from './containers/root/root.module';
import { RouterEffects } from './store/effects/router-effects.service';
import { routerStateConfig } from './store/reducers/router.reducers';
import { ViewportEffects } from './store/effects/viewport-effects.service';

@NgModule({
  imports: [
    ...[
      StoreModule.forRoot(reducers, {
        metaReducers,
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }
      }),
      EffectsModule.forRoot([CategoryEffects, OrderEffects, ProductsEffects, RouterEffects, ViewportEffects]),
      StoreRouterConnectingModule.forRoot(routerStateConfig),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ],
    AppRoutingModule,
    BrowserModule,
    MarkdownModule.forRoot(),
    RootModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [RootComponent]
})
export class AppModule {}
