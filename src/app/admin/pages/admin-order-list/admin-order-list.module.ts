import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminOrderListComponent } from './admin-order-list.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';

@NgModule({
  declarations: [AdminOrderListComponent],
  imports: [CommonModule, AdminMenuModule, RouterModule]
})
export class AdminOrderListModule {}
