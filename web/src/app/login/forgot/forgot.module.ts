import { NgModule } from '@angular/core';
import { ForgotComponent } from './forgot.component';
import { CommonModule } from '@angular/common';
import { ForgotRoutingModule } from './forgot-routing.module';
import { UserService } from 'app/layout/users/domain/user.service';
import { ForgotService } from './forgot.service';
import { ResetModule } from './reset/reset.module';
import { ResetComponent } from './reset/reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ForgotRoutingModule, ResetModule, FormsModule, ReactiveFormsModule],
  exports: [],
  declarations: [ForgotComponent],
  providers: [UserService, ForgotService]
})
export class ForgotModule {}
