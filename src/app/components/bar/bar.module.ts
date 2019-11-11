import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [BarComponent],
  exports: [BarComponent],
  imports: [CommonModule, IconModule]
})
export class BarModule {}
