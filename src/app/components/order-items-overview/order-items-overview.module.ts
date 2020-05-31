import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { NoContentModule } from '../no-content/no-content.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SliderImageModule } from '../slider/slider-image/slider-image.module';

import { OrderItemOverviewComponent } from './order-item-overview/order-item-overview.component';
import { OrderItemsOverviewComponent } from './order-items-overview.component';

@NgModule({
  declarations: [OrderItemsOverviewComponent, OrderItemOverviewComponent],
  exports: [OrderItemsOverviewComponent],
  imports: [
    CommonModule,
    PipesModule,
    ClickableActionModule,
    RouterModule,
    SliderImageModule,
    NoContentModule,
    MarkdownModule
  ]
})
export class OrderItemsOverviewModule {}
