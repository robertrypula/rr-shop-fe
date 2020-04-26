import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryUrlPipe } from './category-url/category-url.pipe';
import { DateCustomPipe } from './date/date-custom.pipe';
import { ImagePipe } from './image/image.pipe';
import { OrderStatusPipe } from './order-status/order-status.pipe';
import { PricePipe } from './price/price.pipe';
import { ProductUrlPipe } from './product-url/product-url.pipe';

const pipes = [DateCustomPipe, PricePipe, ImagePipe, CategoryUrlPipe, ProductUrlPipe, OrderStatusPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
  imports: [CommonModule]
})
export class PipesModule {}
