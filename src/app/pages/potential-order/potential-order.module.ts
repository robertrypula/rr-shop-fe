import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PotentialOrderComponent } from './potential-order.component';
import { OrderItemsOverviewModule } from '../../components/order-overview/order-items-overview.module';
import { DeliveryOverviewModule } from '../../components/delivery-overview/delivery-overview.module';
import { PaymentOverviewModule } from '../../components/payment-overview/payment-overview.module';
import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PromoCodeModule } from '../../components/promo-code/promo-code.module';
import { ClientDetailsModule } from '../../components/client-details/client-details.module';

@NgModule({
  declarations: [PotentialOrderComponent],
  imports: [
    CommonModule,
    OrderItemsOverviewModule,
    DeliveryOverviewModule,
    PaymentOverviewModule,
    ClickableActionModule,
    PipesModule,
    PromoCodeModule,
    ClientDetailsModule
  ]
})
export class PotentialOrderModule {}
