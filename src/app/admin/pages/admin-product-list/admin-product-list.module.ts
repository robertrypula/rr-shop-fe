import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminProductListComponent } from './admin-product-list.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';

@NgModule({
  declarations: [AdminProductListComponent],
  imports: [CommonModule, AdminMenuModule, RouterModule]
})
export class AdminProductListModule {}
