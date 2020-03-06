import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BasketOverviewComponent } from './basket-overview.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { BasketOverviewItemComponent } from './basket-overview-item/basket-overview-item.component';

@NgModule({
  declarations: [BasketOverviewComponent, BasketOverviewItemComponent],
  exports: [BasketOverviewComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule, RouterModule]
})
export class BasketOverviewModule {}
