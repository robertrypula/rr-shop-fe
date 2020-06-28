import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminSessionInfoModule } from '../admin-session-info/admin-session-info.module';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';

import { AdminMenuComponent } from './admin-menu.component';

@NgModule({
  declarations: [AdminMenuComponent],
  exports: [AdminMenuComponent],
  imports: [CommonModule, ClickableActionModule, RouterModule, AdminSessionInfoModule]
})
export class AdminMenuModule {}
