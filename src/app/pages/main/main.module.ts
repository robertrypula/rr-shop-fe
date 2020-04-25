import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { ProductsListModule } from '../../components/products-list/products-list.module';
import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ProductsListModule, ClickableActionModule]
})
export class MainModule {}
