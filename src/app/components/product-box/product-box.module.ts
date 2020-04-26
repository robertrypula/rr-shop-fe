import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { ImageModule } from '../image/image.module';
import { OrderService } from '../../services/order.service';
import { PipesModule } from '../../pipes/pipes.module';

import { ProductBoxCompactComponent } from './product-box-compact/product-box-compact.component';
import { ProductBoxFullComponent } from './product-box-full/product-box-full.component';

@NgModule({
  declarations: [ProductBoxFullComponent, ProductBoxCompactComponent],
  exports: [ProductBoxFullComponent, ProductBoxCompactComponent],
  imports: [CommonModule, PipesModule, RouterModule, ClickableActionModule, ImageModule],
  providers: [OrderService]
})
export class ProductBoxModule {}
