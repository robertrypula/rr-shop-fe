import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentComponent } from './content.component';

@NgModule({
  declarations: [ContentComponent],
  exports: [ContentComponent],
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule]
})
export class ContentModule {}
