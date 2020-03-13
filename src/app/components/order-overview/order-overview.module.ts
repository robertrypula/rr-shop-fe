import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrderOverviewComponent } from './order-overview.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { OrderOverviewItemComponent } from './order-overview-item/order-overview-item.component';
import { ImageModule } from '../image/image.module';

@NgModule({
  declarations: [OrderOverviewComponent, OrderOverviewItemComponent],
  exports: [OrderOverviewComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule, RouterModule, ImageModule]
})
export class OrderOverviewModule {}
