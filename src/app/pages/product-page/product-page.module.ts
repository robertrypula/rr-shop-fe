import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDetailsModule } from '../../components/product-details/product-details.module';

import { ProductPageComponent } from './product-page.component';

@NgModule({
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent],
  imports: [CommonModule, ProductDetailsModule]
})
export class ProductPageModule {}
