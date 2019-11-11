import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketOverviewComponent } from './basket-overview.component';

@NgModule({
  declarations: [BasketOverviewComponent],
  exports: [BasketOverviewComponent],
  imports: [CommonModule]
})
export class BasketOverviewModule {}
