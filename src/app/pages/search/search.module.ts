import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductsListModule } from '../../components/products-list/products-list.module';

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, ProductsListModule]
})
export class SearchModule {}
