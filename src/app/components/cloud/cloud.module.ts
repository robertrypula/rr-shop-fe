import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CloudComponent } from './cloud.component';

@NgModule({
  declarations: [CloudComponent],
  exports: [CloudComponent],
  imports: [CommonModule]
})
export class CloudModule {}
