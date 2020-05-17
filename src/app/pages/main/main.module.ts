import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductsListModule } from '../../components/products-list/products-list.module';
import { SliderModule } from '../../components/slider/slider.module';

import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ProductsListModule, SliderModule]
})
export class MainModule {}
