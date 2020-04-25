import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderStickyComponent } from './header-sticky.component';
import { TopMenuModule } from '../top-menu/top-menu.module';
import { TopSearchModule } from '../top-search/top-search.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { TopBasketModule } from '../top-basket/top-basket.module';

@NgModule({
  declarations: [HeaderStickyComponent],
  exports: [HeaderStickyComponent],
  imports: [CommonModule, TopMenuModule, TopSearchModule, ClickableActionModule, TopBasketModule]
})
export class HeaderStickyModule {}
