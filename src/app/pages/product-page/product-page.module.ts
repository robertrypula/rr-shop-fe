import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SliderImageModule } from '../../components/slider/slider-image/slider-image.module';

import { ProductPageComponent } from './product-page.component';

@NgModule({
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent],
  imports: [
    ClickableActionModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SliderImageModule,
    MarkdownModule,
    PipesModule
  ]
})
export class ProductPageModule {}
