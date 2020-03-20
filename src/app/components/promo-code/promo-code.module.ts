import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoCodeComponent } from './promo-code.component';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PromoCodeComponent],
  exports: [PromoCodeComponent],
  imports: [CommonModule, ClickableActionModule, ReactiveFormsModule]
})
export class PromoCodeModule {}
