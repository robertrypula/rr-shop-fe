import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductListComponent } from './admin-product-list.component';
import { AdminMenuModule } from '../../components-admin/admin-menu/admin-menu.module';

@NgModule({
  declarations: [AdminProductListComponent],
  imports: [CommonModule, AdminMenuModule]
})
export class AdminProductListModule {}
