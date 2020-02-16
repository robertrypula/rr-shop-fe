import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [TopMenuComponent],
  exports: [TopMenuComponent],
  imports: [CommonModule, RouterModule, PipesModule]
})
export class TopMenuModule {}
