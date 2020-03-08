import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryOverviewComponent } from './delivery-overview.component';
import { DeliveryOverviewItemComponent } from './delivery-overview-item/delivery-overview-item.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';

@NgModule({
  declarations: [DeliveryOverviewComponent, DeliveryOverviewItemComponent],
  exports: [DeliveryOverviewComponent, DeliveryOverviewItemComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule]
})
export class DeliveryOverviewModule {}
