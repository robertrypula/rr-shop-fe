import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBasketComponent } from './top-basket.component';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';

@NgModule({
  declarations: [TopBasketComponent],
  exports: [TopBasketComponent],
  imports: [CommonModule, ClickableActionModule]
})
export class TopBasketModule {}
