import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../../pipes/pipes.module';

import { BarComponent } from './bar.component';

@NgModule({
  declarations: [BarComponent],
  exports: [BarComponent],
  imports: [CommonModule, IconModule, ClickableActionModule, PipesModule, RouterModule]
})
export class BarModule {}
