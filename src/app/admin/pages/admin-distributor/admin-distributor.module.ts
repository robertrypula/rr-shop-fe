import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminDistributorCreateComponent } from './admin-distributor-create/admin-distributor-create.component';
import { AdminDistributorEditComponent } from './admin-distributor-edit/admin-distributor-edit.component';
import { AdminDistributorFormComponent } from './admin-distributor-form/admin-distributor-form.component';

@NgModule({
  declarations: [AdminDistributorCreateComponent, AdminDistributorEditComponent, AdminDistributorFormComponent],
  imports: [CommonModule, AdminMenuModule, ClickableActionModule, FormsModule, PipesModule]
})
export class AdminDistributorModule {}
