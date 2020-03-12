import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BasketOverviewComponent } from './basket-overview.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { BasketOverviewItemComponent } from './basket-overview-item/basket-overview-item.component';
import { ImageModule } from '../image/image.module';

@NgModule({
  declarations: [BasketOverviewComponent, BasketOverviewItemComponent],
  exports: [BasketOverviewComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule, RouterModule, ImageModule]
})
export class BasketOverviewModule {}
