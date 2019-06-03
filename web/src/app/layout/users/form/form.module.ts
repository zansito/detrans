import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { UsersRoutingModule } from '../users-routing.module';
import { UserService } from '../domain/user.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [FormComponent],
  providers: []
})
export class FormModule {}


