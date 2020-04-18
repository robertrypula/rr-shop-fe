import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPageComponent } from './order-page.component';
import { OrderModule } from '../../components/order/order.module';

@NgModule({
  declarations: [OrderPageComponent],
  imports: [CommonModule, OrderModule]
})
export class OrderPageModule {}
