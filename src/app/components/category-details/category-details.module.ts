import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { CategoriesListModule } from '../categories-list/categories-list.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ProductsListModule } from '../products-list/products-list.module';

import { CategoryDetailsComponent } from './category-details.component';

@NgModule({
  declarations: [CategoryDetailsComponent],
  exports: [CategoryDetailsComponent],
  imports: [CommonModule, CategoriesListModule, ProductsListModule, PipesModule, MarkdownModule]
})
export class CategoryDetailsModule {}
