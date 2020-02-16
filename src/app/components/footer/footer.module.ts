import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';

import { FooterGroupComponent } from './footer-group/footer-group.component';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [FooterComponent, FooterGroupComponent],
  exports: [FooterComponent],
  imports: [CommonModule, RouterModule, DirectivesModule, PipesModule]
})
export class FooterModule {}
