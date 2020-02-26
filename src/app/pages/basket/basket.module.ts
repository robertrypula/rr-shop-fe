import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketOverviewModule } from "../../components/basket-overview/basket-overview.module";

@NgModule({
  declarations: [BasketComponent],
  imports: [CommonModule, BasketOverviewModule]
})
export class BasketModule {}
