import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { CategoriesListModule } from '../categories-list/categories-list.module';
import { CategoryUrlPipe } from '../../pipes/category-url/category-url.pipe';
import { PipesModule } from '../../pipes/pipes.module';
import { ProductsListModule } from '../products-list/products-list.module';

import { CategoryDetailsComponent } from './category-details.component';
import { IconModule } from "../icon/icon.module";

@NgModule({
  declarations: [CategoryDetailsComponent],
  exports: [CategoryDetailsComponent],
  imports: [CategoriesListModule, CommonModule, FormsModule, MarkdownModule, ProductsListModule, PipesModule, IconModule],
  providers: [CategoryUrlPipe]
})
export class CategoryDetailsModule {}
