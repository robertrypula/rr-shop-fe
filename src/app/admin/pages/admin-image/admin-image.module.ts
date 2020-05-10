import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminImageCreateComponent } from './admin-image-create/admin-image-create.component';
import { AdminImageEditComponent } from './admin-image-edit/admin-image-edit.component';
import { AdminImageFormComponent } from './admin-image-form/admin-image-form.component';

@NgModule({
  declarations: [AdminImageCreateComponent, AdminImageEditComponent, AdminImageFormComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, FormsModule, PipesModule]
})
export class AdminImageModule {}
