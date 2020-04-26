import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { IconModule } from '../icon/icon.module';

import { BarComponent } from './bar.component';

@NgModule({
  declarations: [BarComponent],
  exports: [BarComponent],
  imports: [CommonModule, IconModule, ClickableActionModule]
})
export class BarModule {}
