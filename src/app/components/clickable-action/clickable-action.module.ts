import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickableActionComponent } from './clickable-action.component';
import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClickableActionComponent],
  exports: [ClickableActionComponent],
  imports: [CommonModule, IconModule, RouterModule]
})
export class ClickableActionModule {}
