import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

import { CategoriesListComponent } from './categories-list.component';

@NgModule({
  declarations: [CategoriesListComponent],
  exports: [CategoriesListComponent],
  imports: [CommonModule, ClickableActionModule, PipesModule, MarkdownModule]
})
export class CategoriesListModule {}
