import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar.component';
import { IconModule } from '../icon/icon.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';

@NgModule({
  declarations: [BarComponent],
  exports: [BarComponent],
  imports: [CommonModule, IconModule, ClickableActionModule]
})
export class BarModule {}
