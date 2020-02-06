import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { FooterGroupComponent } from './footer-group/footer-group.component';

@NgModule({
  declarations: [FooterComponent, FooterGroupComponent],
  exports: [FooterComponent],
  imports: [CommonModule, RouterModule]
})
export class FooterModule {}
