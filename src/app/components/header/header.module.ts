import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { LogoModule } from '../logo/logo.module';
import { TopMenuModule } from '../top-menu/top-menu.module';
import { TopSearchModule } from '../top-search/top-search.module';
import { TopBasketModule } from '../top-basket/top-basket.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, LogoModule, TopMenuModule, TopSearchModule, TopBasketModule]
})
export class HeaderModule {}
