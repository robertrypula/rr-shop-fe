import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { CategoryNodeComponent } from './category-node/category-node.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [CategoriesComponent, CategoryNodeComponent],
  exports: [CategoriesComponent],
  imports: [CommonModule, RouterModule, ClickableActionModule, PipesModule]
})
export class CategoriesModule {}
