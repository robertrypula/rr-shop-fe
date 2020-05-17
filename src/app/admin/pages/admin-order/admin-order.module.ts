import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { SliderImageModule } from '../../../components/slider-image/slider-image.module';

import { AdminOrderComponent } from './admin-order.component';

@NgModule({
  declarations: [AdminOrderComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, PipesModule, SliderImageModule]
})
export class AdminOrderModule {}
