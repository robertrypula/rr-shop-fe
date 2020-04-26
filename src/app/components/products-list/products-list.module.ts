import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ProductBoxModule } from '../product-box/product-box.module';

import { ProductsListComponent } from './products-list.component';

@NgModule({
  declarations: [ProductsListComponent],
  exports: [ProductsListComponent],
  imports: [CommonModule, ProductBoxModule, ClickableActionModule, PipesModule]
})
export class ProductsListModule {}
