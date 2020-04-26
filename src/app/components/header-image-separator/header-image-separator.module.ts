import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesModule } from '../../directives/directives.module';

import { HeaderImageSeparatorComponent } from './header-image-separator.component';

@NgModule({
  declarations: [HeaderImageSeparatorComponent],
  exports: [HeaderImageSeparatorComponent],
  imports: [CommonModule, DirectivesModule]
})
export class HeaderImageSeparatorModule {}
