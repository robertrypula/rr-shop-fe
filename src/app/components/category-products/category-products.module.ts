import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductsListModule } from '../products-list/products-list.module';

import { CategoryProductsComponent } from './category-products.component';

@NgModule({
  declarations: [CategoryProductsComponent],
  exports: [CategoryProductsComponent],
  imports: [CommonModule, ProductsListModule]
})
export class CategoryProductsModule {}
