import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

import { PaymentOverviewItemComponent } from './payment-overview-item/payment-overview-item.component';
import { PaymentOverviewComponent } from './payment-overview.component';

@NgModule({
  declarations: [PaymentOverviewComponent, PaymentOverviewItemComponent],
  exports: [PaymentOverviewComponent, PaymentOverviewItemComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule]
})
export class PaymentOverviewModule {}
