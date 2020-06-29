import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MarkdownModule } from 'ngx-markdown';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './admin/rest-api/auth.interceptor';
import { effects } from './store/effects';
import { metaReducers, reducers } from './store/reducers';
import { RootComponent } from './containers/root/root.component';
import { RootModule } from './containers/root/root.module';
import { routerStateConfig } from './store/reducers/router.reducers';

@NgModule({
  imports: [
    ...[
      StoreModule.forRoot(reducers, {
        metaReducers,
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }
      }),
      EffectsModule.forRoot(effects),
      StoreRouterConnectingModule.forRoot(routerStateConfig),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ],
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    RootModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [RootComponent]
})
export class AppModule {}
