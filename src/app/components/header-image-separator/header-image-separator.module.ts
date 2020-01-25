import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderImageSeparatorComponent } from './header-image-separator.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [HeaderImageSeparatorComponent],
  exports: [HeaderImageSeparatorComponent],
  imports: [CommonModule, DirectivesModule]
})
export class HeaderImageSeparatorModule {}
