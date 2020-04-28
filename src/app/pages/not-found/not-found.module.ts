import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NoContentModule } from '../../components/no-content/no-content.module';

import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NoContentModule]
})
export class NotFoundModule {}
