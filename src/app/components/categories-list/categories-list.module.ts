import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list.component';
import { ClickableActionModule } from "../clickable-action/clickable-action.module";
import { PipesModule } from "../../pipes/pipes.module";
import { MarkdownModule } from "ngx-markdown";

@NgModule({
  declarations: [CategoriesListComponent],
  exports: [
    CategoriesListComponent
  ],
  imports: [CommonModule, ClickableActionModule, PipesModule, MarkdownModule]
})
export class CategoriesListModule {}
