import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoContentModule } from '../../components/no-content/no-content.module';
import { OrderModule } from '../../components/order/order.module';

import { OrderPageComponent } from './order-page.component';

@NgModule({
  declarations: [OrderPageComponent],
  imports: [CommonModule, OrderModule, NoContentModule]
})
export class OrderPageModule {}
