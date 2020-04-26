import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminOrderListComponent } from './admin-order-list.component';

@NgModule({
  declarations: [AdminOrderListComponent],
  imports: [CommonModule, AdminMenuModule, RouterModule, PipesModule, ClickableActionModule]
})
export class AdminOrderListModule {}
