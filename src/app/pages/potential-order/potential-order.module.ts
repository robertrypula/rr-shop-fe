import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PotentialOrderComponent } from './potential-order.component';
import { BasketOverviewModule } from '../../components/basket-overview/basket-overview.module';
import { DeliveryOverviewModule } from '../../components/delivery-overview/delivery-overview.module';
import { PaymentOverviewModule } from '../../components/payment-overview/payment-overview.module';

@NgModule({
  declarations: [PotentialOrderComponent],
  imports: [CommonModule, BasketOverviewModule, DeliveryOverviewModule, PaymentOverviewModule]
})
export class PotentialOrderModule {}
