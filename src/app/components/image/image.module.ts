import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

import { ImageComponent } from './image.component';

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent],
  imports: [CommonModule, ClickableActionModule, PipesModule]
})
export class ImageModule {}
