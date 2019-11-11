import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSearchComponent } from './top-search.component';

@NgModule({
  declarations: [TopSearchComponent],
  exports: [TopSearchComponent],
  imports: [CommonModule]
})
export class TopSearchModule {}
