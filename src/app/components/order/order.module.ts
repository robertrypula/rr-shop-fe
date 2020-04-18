import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { PipesModule } from '../../pipes/pipes.module';
import { ClickableActionModule } from "../clickable-action/clickable-action.module";

@NgModule({
  declarations: [OrderComponent],
  exports: [OrderComponent],
  imports: [CommonModule, PipesModule, ClickableActionModule]
})
export class OrderModule {}
