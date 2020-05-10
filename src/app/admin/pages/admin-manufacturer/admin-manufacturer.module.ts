import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminManufacturerCreateComponent } from './admin-manufacturer-create/admin-manufacturer-create.component';
import { AdminManufacturerEditComponent } from './admin-manufacturer-edit/admin-manufacturer-edit.component';
import { AdminManufacturerFormComponent } from './admin-manufacturer-form/admin-manufacturer-form.component';

@NgModule({
  declarations: [AdminManufacturerCreateComponent, AdminManufacturerEditComponent, AdminManufacturerFormComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, FormsModule, PipesModule]
})
export class AdminManufacturerModule {}
