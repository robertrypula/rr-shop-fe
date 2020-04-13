import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsListComponent } from './products-list.component';
import { ProductBoxModule } from '../product-box/product-box.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ProductsListComponent],
  exports: [ProductsListComponent],
  imports: [CommonModule, ProductBoxModule, ClickableActionModule, PipesModule]
})
export class ProductsListModule {}
