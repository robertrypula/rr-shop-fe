import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { ProductModule } from '../product/product.module';
import { ProductBoxModule } from '../../components/product-box/product-box.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, RouterModule, ProductModule, ProductBoxModule]
})
export class CategoryModule {}