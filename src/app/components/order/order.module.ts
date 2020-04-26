import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

import { OrderComponent } from './order.component';

@NgModule({
  declarations: [OrderComponent],
  exports: [OrderComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule]
})
export class OrderModule {}
