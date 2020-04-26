import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

import { FooterGroupComponent } from './footer-group/footer-group.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent, FooterGroupComponent],
  exports: [FooterComponent],
  imports: [CommonModule, RouterModule, DirectivesModule, PipesModule, MarkdownModule]
})
export class FooterModule {}
