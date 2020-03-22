import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetailsComponent } from './client-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';

@NgModule({
  declarations: [ClientDetailsComponent],
  exports: [ClientDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, ClickableActionModule]
})
export class ClientDetailsModule {}
