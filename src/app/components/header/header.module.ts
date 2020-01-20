import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { BasketOverviewModule } from '../basket-overview/basket-overview.module';
import { TopMenuModule } from '../top-menu/top-menu.module';
import { TopSearchModule } from '../top-search/top-search.module';
import { CloudModule } from '../cloud/cloud.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    BasketOverviewModule,
    ClickableActionModule,
    CloudModule,
    CommonModule,
    RouterModule,
    TopMenuModule,
    TopSearchModule
  ]
})
export class HeaderModule {}
