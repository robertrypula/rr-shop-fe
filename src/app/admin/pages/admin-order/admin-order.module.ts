import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrderComponent } from './admin-order.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [AdminOrderComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, PipesModule]
})
export class AdminOrderModule {}
