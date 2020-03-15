import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu.component';
import { ClickableActionModule } from '../../../components/clickable-action/clickable-action.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminMenuComponent],
  exports: [AdminMenuComponent],
  imports: [CommonModule, ClickableActionModule, RouterModule]
})
export class AdminMenuModule {}
