import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminProductCreateComponent } from './admin-product-create/admin-product-create.component';
import { AdminProductEditComponent } from './admin-product-edit/admin-product-edit.component';
import { AdminProductFormComponent } from './admin-product-form/admin-product-form.component';

@NgModule({
  declarations: [AdminProductCreateComponent, AdminProductEditComponent, AdminProductFormComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, FormsModule, PipesModule]
})
export class AdminProductModule {}
