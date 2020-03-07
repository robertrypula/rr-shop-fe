import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentOverviewComponent } from './payment-overview.component';
import { PaymentOverviewItemComponent } from './payment-overview-item/payment-overview-item.component';

@NgModule({
  declarations: [PaymentOverviewComponent, PaymentOverviewItemComponent],
  exports: [PaymentOverviewComponent],
  imports: [CommonModule]
})
export class PaymentOverviewModule {}
