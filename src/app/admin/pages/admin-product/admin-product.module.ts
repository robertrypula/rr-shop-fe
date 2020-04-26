import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';

import { AdminProductComponent } from './admin-product.component';

@NgModule({
  declarations: [AdminProductComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule]
})
export class AdminProductModule {}
