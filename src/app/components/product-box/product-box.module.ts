import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxFullComponent } from './product-box-full/product-box-full.component';
import { ProductBoxCompactComponent } from './product-box-compact/product-box-compact.component';

@NgModule({
  declarations: [ProductBoxFullComponent, ProductBoxCompactComponent],
  exports: [ProductBoxFullComponent, ProductBoxCompactComponent],
  imports: [CommonModule]
})
export class ProductBoxModule {}
