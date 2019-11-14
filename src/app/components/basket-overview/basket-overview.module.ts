import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketOverviewComponent } from './basket-overview.component';
import { BasketOverviewItemComponent } from './basket-overview-item/basket-overview-item.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [BasketOverviewComponent, BasketOverviewItemComponent],
  exports: [BasketOverviewComponent],
  imports: [CommonModule, PipesModule]
})
export class BasketOverviewModule {}
