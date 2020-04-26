import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';

import { TopSearchComponent } from './top-search.component';

@NgModule({
  declarations: [TopSearchComponent],
  exports: [TopSearchComponent],
  imports: [CommonModule, ClickableActionModule, FormsModule]
})
export class TopSearchModule {}
