import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClickableActionModule } from '../clickable-action/clickable-action.module';
import { PipesModule } from '../../pipes/pipes.module';

import { CategoriesComponent } from './categories.component';
import { CategoryNodeComponent } from './category-node/category-node.component';

@NgModule({
  declarations: [CategoriesComponent, CategoryNodeComponent],
  exports: [CategoriesComponent],
  imports: [CommonModule, RouterModule, ClickableActionModule, PipesModule]
})
export class CategoriesModule {}
