import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SliderImageModule } from '../../components/slider-image/slider-image.module';

import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent],
  exports: [ProductComponent],
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
export class ProductModule {}
