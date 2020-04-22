import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductComponent } from './admin-product.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';

@NgModule({
  declarations: [AdminProductComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule]
})
export class AdminProductModule {}
