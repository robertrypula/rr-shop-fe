import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductComponent } from './admin-product.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';

@NgModule({
  declarations: [AdminProductComponent],
  imports: [CommonModule, AdminMenuModule]
})
export class AdminProductModule {}
