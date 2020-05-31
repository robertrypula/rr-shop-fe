import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../../clickable-action/clickable-action.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { SliderCategoryComponent } from './slider-category.component';

@NgModule({
  declarations: [SliderCategoryComponent],
  exports: [SliderCategoryComponent],
  imports: [CommonModule, ClickableActionModule, PipesModule]
})
export class SliderCategoryModule {}
