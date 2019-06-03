import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserService } from 'app/layout/users/domain/user.service';
import { ResetService } from './reset.service';
import { ResetComponent } from 'app/login/forgot/reset/reset.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [],
  declarations: [ResetComponent],
  providers: [UserService, ResetService]
})
export class ResetModule {}
