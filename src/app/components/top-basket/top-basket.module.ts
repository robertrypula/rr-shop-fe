import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';

import { TopBasketComponent } from './top-basket.component';

@NgModule({
  declarations: [TopBasketComponent],
  exports: [TopBasketComponent],
  imports: [CommonModule, ClickableActionModule]
})
export class TopBasketModule {}
