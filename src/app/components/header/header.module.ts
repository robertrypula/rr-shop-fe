import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LogoModule } from '../logo/logo.module';
import { TopBasketModule } from '../top-basket/top-basket.module';
import { TopMenuModule } from '../top-menu/top-menu.module';
import { TopSearchModule } from '../top-search/top-search.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, LogoModule, TopMenuModule, TopSearchModule, TopBasketModule]
})
export class HeaderModule {}
