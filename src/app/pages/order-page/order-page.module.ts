import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrderModule } from '../../components/order/order.module';

import { OrderPageComponent } from './order-page.component';

@NgModule({
  declarations: [OrderPageComponent],
  imports: [CommonModule, OrderModule]
})
export class OrderPageModule {}
