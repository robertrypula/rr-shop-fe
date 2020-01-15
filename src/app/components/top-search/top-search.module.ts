import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopSearchComponent } from './top-search.component';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TopSearchComponent],
  exports: [TopSearchComponent],
  imports: [CommonModule, ButtonModule, FormsModule]
})
export class TopSearchModule {}
