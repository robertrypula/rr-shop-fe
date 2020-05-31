import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { CategoriesListModule } from '../../components/categories-list/categories-list.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ProductsListModule } from '../../components/products-list/products-list.module';

import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, MarkdownModule, ProductsListModule, CategoriesListModule, PipesModule]
})
export class CategoryModule {}
