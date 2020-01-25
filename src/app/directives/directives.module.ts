import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParalaxDirective } from './paralax/paralax.directive';

@NgModule({
  declarations: [ParalaxDirective],
  exports: [ParalaxDirective],
  imports: [CommonModule]
})
export class DirectivesModule {}
