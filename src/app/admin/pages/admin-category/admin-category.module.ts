import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminCategoryCreateComponent } from './admin-category-create.component';
import { AdminCategoryEditComponent } from './admin-category-edit.component';

@NgModule({
  declarations: [AdminCategoryCreateComponent, AdminCategoryEditComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, FormsModule, PipesModule]
})
export class AdminCategoryModule {}
