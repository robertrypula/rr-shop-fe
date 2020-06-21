import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminSessionInfoComponent } from './admin-session-info.component';

@NgModule({
  declarations: [AdminSessionInfoComponent],
  exports: [AdminSessionInfoComponent],
  imports: [CommonModule]
})
export class AdminSessionInfoModule {}
