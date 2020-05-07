import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminCategoryCreateComponent } from './admin-category-create/admin-category-create.component';
import { AdminCategoryEditComponent } from './admin-category-edit/admin-category-edit.component';
import { AdminCategoryFormComponent } from './admin-category-form/admin-category-form.component';

@NgModule({
  declarations: [AdminCategoryCreateComponent, AdminCategoryEditComponent, AdminCategoryFormComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, FormsModule, PipesModule]
})
export class AdminCategoryModule {}
