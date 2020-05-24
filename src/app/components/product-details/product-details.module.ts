import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SliderImageModule } from '../slider/slider-image/slider-image.module';

import { ProductDetailsComponent } from './product-details.component';
import { CategoryRelatedProductsComponent } from './category-related-products/category-related-products.component';
import { CategoryProductsModule } from "../category-products/category-products.module";

@NgModule({
  declarations: [ProductDetailsComponent, CategoryRelatedProductsComponent],
  exports: [ProductDetailsComponent],
  imports: [CommonModule, SliderImageModule, ClickableActionModule, MarkdownModule, PipesModule, CategoryProductsModule]
})
export class ProductDetailsModule {}
