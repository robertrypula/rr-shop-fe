import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../../pipes/pipes.module';
import { ProductsListModule } from '../products-list/products-list.module';

import { CategoryProductsComponent } from './category-products.component';

@NgModule({
  declarations: [CategoryProductsComponent],
  exports: [CategoryProductsComponent],
  imports: [CommonModule, ProductsListModule, RouterModule, PipesModule]
})
export class CategoryProductsModule {}
