import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentOverviewComponent } from './payment-overview.component';

@NgModule({
  declarations: [PaymentOverviewComponent],
  exports: [PaymentOverviewComponent],
  imports: [CommonModule]
})
export class PaymentOverviewModule {}
