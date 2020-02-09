import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';

import { FooterGroupComponent } from './footer-group/footer-group.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [FooterComponent, FooterGroupComponent],
  exports: [FooterComponent],
  imports: [CommonModule, RouterModule, DirectivesModule]
})
export class FooterModule {}
