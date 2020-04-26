import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { ClientDetailsModule } from '../../components/client-details/client-details.module';
import { DeliveryOverviewModule } from '../../components/delivery-overview/delivery-overview.module';
import { OrderItemsOverviewModule } from '../../components/order-items-overview/order-items-overview.module';
import { PaymentOverviewModule } from '../../components/payment-overview/payment-overview.module';
import { PipesModule } from '../../pipes/pipes.module';
import { PromoCodeModule } from '../../components/promo-code/promo-code.module';

import { PotentialOrderComponent } from './potential-order.component';

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
    ClientDetailsModule,
    RouterModule
  ]
})
export class PotentialOrderModule {}
