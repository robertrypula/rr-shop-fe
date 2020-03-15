import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderListComponent } from './admin-order-list.component';
import { AdminMenuModule } from '../../components-admin/admin-menu/admin-menu.module';

@NgModule({
  declarations: [AdminOrderListComponent],
  imports: [CommonModule, AdminMenuModule]
})
export class AdminOrderListModule {}
