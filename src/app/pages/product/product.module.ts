import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { ImageModule } from '../../components/image/image.module';
import { PipesModule } from '../../pipes/pipes.module';

import { ProductComponent } from './product.component';

@NgModule({
  declarations: [ProductComponent],
  exports: [ProductComponent],
  imports: [
    ClickableActionModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ImageModule,
    MarkdownModule,
    PipesModule
  ]
})
export class ProductModule {}
