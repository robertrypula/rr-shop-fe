import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryOverviewComponent } from './delivery-overview.component';

@NgModule({
  declarations: [DeliveryOverviewComponent],
  exports: [DeliveryOverviewComponent],
  imports: [CommonModule]
})
export class DeliveryOverviewModule {}
