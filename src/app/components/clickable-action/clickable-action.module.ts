import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IconModule } from '../icon/icon.module';

import { ClickableActionComponent } from './clickable-action.component';

@NgModule({
  declarations: [ClickableActionComponent],
  exports: [ClickableActionComponent],
  imports: [CommonModule, IconModule, RouterModule]
})
export class ClickableActionModule {}
