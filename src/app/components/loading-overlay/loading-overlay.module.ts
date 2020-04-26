import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingOverlayComponent } from './loading-overlay.component';

@NgModule({
  declarations: [LoadingOverlayComponent],
  exports: [LoadingOverlayComponent],
  imports: [CommonModule]
})
export class LoadingOverlayModule {}
