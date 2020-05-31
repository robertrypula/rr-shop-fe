import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { ClientDetailsModule } from '../client-details/client-details.module';
import { DeliveryOverviewModule } from '../delivery-overview/delivery-overview.module';
import { OrderItemsOverviewModule } from '../order-items-overview/order-items-overview.module';
import { PaymentOverviewModule } from '../payment-overview/payment-overview.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PromoCodeModule } from '../promo-code/promo-code.module';

import { PotentialOrderComponent } from './potential-order.component';

@NgModule({
  declarations: [PotentialOrderComponent],
  exports: [PotentialOrderComponent],
  imports: [
    CommonModule,
    DeliveryOverviewModule,
    PaymentOverviewModule,
    ClientDetailsModule,
    PromoCodeModule,
    PipesModule,
    ClickableActionModule,
    RouterModule,
    OrderItemsOverviewModule
  ]
})
export class PotentialOrderModule {}
