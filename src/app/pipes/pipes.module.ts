import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricePipe } from './price/price.pipe';
import { ImagePipe } from './image/image.pipe';
import { CategoryUrlPipe } from './category-url/category-url.pipe';
import { ProductUrlPipe } from './product-url/product-url.pipe';
import { DateCustomPipe } from './date/date-custom.pipe';
import { OrderStatusPipe } from './order-status/order-status.pipe';

const pipes = [DateCustomPipe, PricePipe, ImagePipe, CategoryUrlPipe, ProductUrlPipe, OrderStatusPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
  imports: [CommonModule]
})
export class PipesModule {}
