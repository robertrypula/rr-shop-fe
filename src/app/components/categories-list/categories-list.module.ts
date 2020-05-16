import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list.component';
import { ClickableActionModule } from "../clickable-action/clickable-action.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [CategoriesListComponent],
  exports: [
    CategoriesListComponent
  ],
  imports: [CommonModule, ClickableActionModule, PipesModule]
})
export class CategoriesListModule {}
