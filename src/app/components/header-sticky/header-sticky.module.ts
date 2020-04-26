import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { TopBasketModule } from '../top-basket/top-basket.module';
import { TopMenuModule } from '../top-menu/top-menu.module';
import { TopSearchModule } from '../top-search/top-search.module';

import { HeaderStickyComponent } from './header-sticky.component';

@NgModule({
  declarations: [HeaderStickyComponent],
  exports: [HeaderStickyComponent],
  imports: [CommonModule, TopMenuModule, TopSearchModule, ClickableActionModule, TopBasketModule]
})
export class HeaderStickyModule {}
