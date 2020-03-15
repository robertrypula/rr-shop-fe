import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root.component';
import { RootModule } from './root.module';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './rest-api/auth.interceptor';

@NgModule({
  imports: [AppRoutingModule, CoreModule, BrowserModule, RootModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [RootComponent]
})
export class AppModule {}
