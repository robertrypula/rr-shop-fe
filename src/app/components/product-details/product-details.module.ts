import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { CategoryProductsModule } from '../category-products/category-products.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SliderImageModule } from '../slider/slider-image/slider-image.module';

import { CategoryRelatedProductsComponent } from './category-related-products/category-related-products.component';
import { ProductDetailsComponent } from './product-details.component';
import { RelatedArticlesComponent } from './related-articles/related-articles.component';

@NgModule({
  declarations: [ProductDetailsComponent, CategoryRelatedProductsComponent, RelatedArticlesComponent],
  exports: [ProductDetailsComponent],
  imports: [
    CategoryProductsModule,
    ClickableActionModule,
    CommonModule,
    IconModule,
    MarkdownModule,
    PipesModule,
    SliderImageModule,
    RouterModule
  ]
})
export class ProductDetailsModule {}
