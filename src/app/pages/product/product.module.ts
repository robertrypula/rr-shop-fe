import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { ProductComponent } from './product.component';
import { ClickableActionModule } from '../../components/clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ImageModule } from '../../components/image/image.module';

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
