import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricePipe } from './price/price.pipe';
import { ImagePipe } from './image/image.pipe';

const pipes = [PricePipe, ImagePipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
  imports: [CommonModule]
})
export class PipesModule {}
