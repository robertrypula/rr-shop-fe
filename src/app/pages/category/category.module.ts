import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ProductsListModule } from '../../components/products-list/products-list.module';

import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, MarkdownModule, ProductsListModule]
})
export class CategoryModule {}
