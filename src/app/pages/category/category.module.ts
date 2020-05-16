import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ProductBoxModule } from '../../components/product-box/product-box.module';
import { ProductModule } from '../product/product.module';
import { ProductsListModule } from '../../components/products-list/products-list.module';

import { CategoryComponent } from './category.component';
import { CategoriesListModule } from "../../components/categories-list/categories-list.module";

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, RouterModule, ProductModule, ProductBoxModule, MarkdownModule, ProductsListModule, CategoriesListModule]
})
export class CategoryModule {}
