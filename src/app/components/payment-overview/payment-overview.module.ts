import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentOverviewComponent } from './payment-overview.component';
import { PaymentOverviewItemComponent } from './payment-overview-item/payment-overview-item.component';
import { DeliveryOverviewModule } from '../delivery-overview/delivery-overview.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [PaymentOverviewComponent, PaymentOverviewItemComponent],
  exports: [PaymentOverviewComponent],
  imports: [CommonModule, DeliveryOverviewModule, ClickableActionModule, PipesModule]
})
export class PaymentOverviewModule {}
