import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { AdminImageListComponent } from './admin-image-list.component';

@NgModule({
  declarations: [AdminImageListComponent],
  imports: [CommonModule, ClickableActionModule, AdminMenuModule, RouterModule, PipesModule]
})
export class AdminImageListModule {}
