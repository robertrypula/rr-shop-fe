import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  exports: [CategoriesComponent],
  imports: [CommonModule, RouterModule]
})
export class CategoriesModule {}
