import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../../clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { SliderImageComponent } from './slider-image.component';

@NgModule({
  declarations: [SliderImageComponent],
  exports: [SliderImageComponent],
  imports: [CommonModule, ClickableActionModule, PipesModule]
})
export class SliderImageModule {}
