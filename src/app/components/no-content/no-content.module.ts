import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoContentComponent } from './no-content.component';

@NgModule({
  declarations: [NoContentComponent],
  exports: [NoContentComponent],
  imports: [CommonModule]
})
export class NoContentModule {}
