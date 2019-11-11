import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { BasketOverviewModule } from '../basket-overview/basket-overview.module';
import { TopMenuModule } from '../top-menu/top-menu.module';
import { TopSearchModule } from '../top-search/top-search.module';
import { CloudModule } from '../cloud/cloud.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, BasketOverviewModule, TopMenuModule, TopSearchModule, CloudModule]
})
export class HeaderModule {}
