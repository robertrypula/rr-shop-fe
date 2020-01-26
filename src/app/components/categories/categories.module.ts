import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';

@NgModule({
  declarations: [CategoriesComponent],
  exports: [CategoriesComponent],
    imports: [CommonModule, RouterModule, ClickableActionModule]
})
export class CategoriesModule {}
