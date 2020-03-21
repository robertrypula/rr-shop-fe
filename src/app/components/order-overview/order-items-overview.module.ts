import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrderItemsOverviewComponent } from './order-items-overview.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { OrderOverviewItemComponent } from './order-overview-item/order-overview-item.component';
import { ImageModule } from '../image/image.module';

@NgModule({
  declarations: [OrderItemsOverviewComponent, OrderOverviewItemComponent],
  exports: [OrderItemsOverviewComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule, RouterModule, ImageModule]
})
export class OrderItemsOverviewModule {}
