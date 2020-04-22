import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrderComponent } from './admin-order.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';

@NgModule({
  declarations: [AdminOrderComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule]
})
export class AdminOrderModule {}
