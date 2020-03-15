import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderComponent } from './admin-order.component';
import { AdminMenuModule } from '../../components-admin/admin-menu/admin-menu.module';

@NgModule({
  declarations: [AdminOrderComponent],
  imports: [CommonModule, AdminMenuModule]
})
export class AdminOrderModule {}
