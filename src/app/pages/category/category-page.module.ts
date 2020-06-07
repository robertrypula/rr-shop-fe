import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryDetailsModule } from '../../components/category-details/category-details.module';

import { CategoryPageComponent } from './category-page.component';

@NgModule({
  declarations: [CategoryPageComponent],
  imports: [CommonModule, CategoryDetailsModule]
})
export class CategoryPageModule {}
