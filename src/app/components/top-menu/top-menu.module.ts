import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../../pipes/pipes.module';

import { TopMenuComponent } from './top-menu.component';

@NgModule({
  declarations: [TopMenuComponent],
  exports: [TopMenuComponent],
  imports: [CommonModule, RouterModule, PipesModule]
})
export class TopMenuModule {}
