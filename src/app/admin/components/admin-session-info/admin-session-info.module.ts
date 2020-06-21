import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '../../../pipes/pipes.module';

import { AdminSessionInfoComponent } from './admin-session-info.component';

@NgModule({
  declarations: [AdminSessionInfoComponent],
  exports: [AdminSessionInfoComponent],
  imports: [CommonModule, PipesModule]
})
export class AdminSessionInfoModule {}
