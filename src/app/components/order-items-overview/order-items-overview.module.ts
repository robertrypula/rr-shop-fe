import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { ImageModule } from '../image/image.module';
import { PipesModule } from '../../pipes/pipes.module';

import { OrderItemOverviewComponent } from './order-item-overview/order-item-overview.component';
import { OrderItemsOverviewComponent } from './order-items-overview.component';

@NgModule({
  declarations: [OrderItemsOverviewComponent, OrderItemOverviewComponent],
  exports: [OrderItemsOverviewComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule, RouterModule, ImageModule]
})
export class OrderItemsOverviewModule {}
