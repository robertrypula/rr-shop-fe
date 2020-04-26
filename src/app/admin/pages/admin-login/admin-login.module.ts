import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminMenuModule } from '../../components/admin-menu/admin-menu.module';

import { AdminLoginComponent } from './admin-login.component';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [CommonModule, AdminMenuModule, ReactiveFormsModule]
})
export class AdminLoginModule {}
