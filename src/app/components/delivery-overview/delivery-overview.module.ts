import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

import { DeliveryOverviewItemComponent } from './delivery-overview-item/delivery-overview-item.component';
import { DeliveryOverviewComponent } from './delivery-overview.component';

@NgModule({
  declarations: [DeliveryOverviewComponent, DeliveryOverviewItemComponent],
  exports: [DeliveryOverviewComponent, DeliveryOverviewItemComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule]
})
export class DeliveryOverviewModule {}
