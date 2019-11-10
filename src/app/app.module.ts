import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root.component';
import { RootModule } from './root.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [AppRoutingModule, CoreModule, BrowserModule, RootModule],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {}
