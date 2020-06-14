import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryUrlPipe } from './category-url/category-url.pipe';
import { DateCustomPipe } from './date/date-custom.pipe';
import { ExternalIdPipe } from './external-id/external-id.pipe';
import { ImageCategoryPipe } from './image/image-category.pipe';
import { ImagePipe } from './image/image.pipe';
import { OrderStatusPipe } from './order-status/order-status.pipe';
import { PricePipe } from './price/price.pipe';
import { ProductUrlPipe } from './product-url/product-url.pipe';
import { PromotionPricePipe } from './promotion-price/promotion-price.pipe';
import { PromotionTextPipe } from './promotion-text/promotion-text.pipe';
import { QuantityTextPipe } from './quantity-text/quantity-text.pipe';
import { SafeHtmlPipe } from './safe-html/safe-html.pipe';
import { StripWhitespacesPipe } from './strip-whitespaces/strip-whitespaces.pipe';

const pipes = [
  CategoryUrlPipe,
  DateCustomPipe,
  ExternalIdPipe,
  ImageCategoryPipe,
  ImagePipe,
  OrderStatusPipe,
  PricePipe,
  ProductUrlPipe,
  PromotionPricePipe,
  PromotionTextPipe,
  QuantityTextPipe,
  SafeHtmlPipe,
  StripWhitespacesPipe
];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
  imports: [CommonModule]
})
export class PipesModule {}
