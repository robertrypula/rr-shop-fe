import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminOrderListComponent } from './admin-order-list.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [AdminOrderListComponent],
  imports: [CommonModule, AdminMenuModule, RouterModule, PipesModule]
})
export class AdminOrderListModule {}
