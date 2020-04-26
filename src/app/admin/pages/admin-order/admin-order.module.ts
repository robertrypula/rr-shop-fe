import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { ImageModule } from '../../../components/image/image.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminOrderComponent } from './admin-order.component';

@NgModule({
  declarations: [AdminOrderComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, PipesModule, ImageModule]
})
export class AdminOrderModule {}
