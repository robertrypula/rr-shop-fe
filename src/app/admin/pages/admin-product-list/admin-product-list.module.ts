import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminProductListComponent } from './admin-product-list.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';

@NgModule({
  declarations: [AdminProductListComponent],
  imports: [CommonModule, AdminMenuModule, RouterModule, PipesModule, ClickableActionModule]
})
export class AdminProductListModule {}
