import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent],
  exports: [ProductComponent],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ProductModule {}
