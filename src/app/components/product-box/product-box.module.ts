import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxFullComponent } from './product-box-full/product-box-full.component';
import { ProductBoxCompactComponent } from './product-box-compact/product-box-compact.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ProductBoxFullComponent, ProductBoxCompactComponent],
  exports: [ProductBoxFullComponent, ProductBoxCompactComponent],
  imports: [CommonModule, PipesModule]
})
export class ProductBoxModule {}
