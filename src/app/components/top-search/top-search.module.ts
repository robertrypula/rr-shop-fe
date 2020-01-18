import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopSearchComponent } from './top-search.component';
import { ClickableActionModule } from '../button/clickable-action.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TopSearchComponent],
  exports: [TopSearchComponent],
  imports: [CommonModule, ClickableActionModule, FormsModule]
})
export class TopSearchModule {}
