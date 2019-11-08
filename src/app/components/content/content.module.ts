import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';
import { CategoriesModule } from '../categories/categories.module';

@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  imports: [CommonModule, RouterModule, CategoriesModule]
})
export class ContentModule {}
