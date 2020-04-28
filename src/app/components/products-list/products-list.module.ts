import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { NoContentModule } from '../no-content/no-content.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ProductBoxModule } from '../product-box/product-box.module';

import { ProductsListComponent } from './products-list.component';

@NgModule({
  declarations: [ProductsListComponent],
  exports: [ProductsListComponent],
  imports: [CommonModule, ProductBoxModule, ClickableActionModule, PipesModule, NoContentModule]
})
export class ProductsListModule {}
