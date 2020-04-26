import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';

import { PromoCodeComponent } from './promo-code.component';

@NgModule({
  declarations: [PromoCodeComponent],
  exports: [PromoCodeComponent],
  imports: [CommonModule, ClickableActionModule, ReactiveFormsModule]
})
export class PromoCodeModule {}
