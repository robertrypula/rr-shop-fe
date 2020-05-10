import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminSupplyCreateComponent } from './admin-supply-create/admin-supply-create.component';
import { AdminSupplyEditComponent } from './admin-supply-edit/admin-supply-edit.component';
import { AdminSupplyFormComponent } from './admin-supply-form/admin-supply-form.component';

@NgModule({
  declarations: [AdminSupplyCreateComponent, AdminSupplyEditComponent, AdminSupplyFormComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, FormsModule, PipesModule]
})
export class AdminSupplyModule {}
