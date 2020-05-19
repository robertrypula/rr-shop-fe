import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryProductsModule } from '../../components/category-products/category-products.module';
import { ProductsListModule } from '../../components/products-list/products-list.module';
import { SliderCategoryModule } from '../../components/slider/slider-category/slider-category.module';

import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ProductsListModule, SliderCategoryModule, CategoryProductsModule]
})
export class MainModule {}
