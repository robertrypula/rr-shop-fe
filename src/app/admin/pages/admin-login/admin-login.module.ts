import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminLoginComponent } from './admin-login.component';
import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, AdminMenuModule, ReactiveFormsModule]
})
export class AdminLoginModule {}
