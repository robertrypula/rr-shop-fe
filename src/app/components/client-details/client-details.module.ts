import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';

import { ClientDetailsComponent } from './client-details.component';

@NgModule({
  declarations: [ClientDetailsComponent],
  exports: [ClientDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, ClickableActionModule]
})
export class ClientDetailsModule {}
