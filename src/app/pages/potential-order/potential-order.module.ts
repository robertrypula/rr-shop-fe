import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PotentialOrderComponent } from './potential-order.component';
import { OrderOverviewModule } from '../../components/order-overview/order-overview.module';
import { DeliveryOverviewModule } from '../../components/delivery-overview/delivery-overview.module';
import { PaymentOverviewModule } from '../../components/payment-overview/payment-overview.module';
import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PotentialOrderComponent],
  imports: [
    CommonModule,
    OrderOverviewModule,
    DeliveryOverviewModule,
    PaymentOverviewModule,
    ClickableActionModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class PotentialOrderModule {}
