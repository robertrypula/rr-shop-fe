import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricePipe } from './price/price.pipe';
import { ImagePipe } from './image/image.pipe';
import { CategoryUrlPipe } from './category-url/category-url.pipe';
import { ProductUrlPipe } from './product-url/product-url.pipe';

const pipes = [PricePipe, ImagePipe, CategoryUrlPipe, ProductUrlPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
  imports: [CommonModule]
})
export class PipesModule {}
