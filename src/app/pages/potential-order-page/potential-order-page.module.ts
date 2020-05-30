import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PotentialOrderModule } from '../../components/potential-order/potential-order.module';

import { PotentialOrderPageComponent } from './potential-order-page.component';

@NgModule({
  declarations: [PotentialOrderPageComponent],
  imports: [CommonModule, PotentialOrderModule]
})
export class PotentialOrderPageModule {}
