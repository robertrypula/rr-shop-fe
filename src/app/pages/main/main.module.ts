import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { ProductsListModule } from '../../components/products-list/products-list.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ProductsListModule]
})
export class MainModule {}
