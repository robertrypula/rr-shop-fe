import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { ProductsListModule } from '../../components/products-list/products-list.module';

import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ProductsListModule, ClickableActionModule]
})
export class MainModule {}
