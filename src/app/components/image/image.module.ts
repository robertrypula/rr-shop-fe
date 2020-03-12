import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ImageComponent],
  exports: [ImageComponent],
  imports: [CommonModule, ClickableActionModule, PipesModule]
})
export class ImageModule {}
