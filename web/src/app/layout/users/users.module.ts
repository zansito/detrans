import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbCarouselModule,
  NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './domain/user.service';
import { ProgressHttp } from 'angular-progress-http';
import { ListComponent } from './list/list.component';
import { DatatableModule } from 'app/shared/styleguide/datatable/datatable.module';
import { UzerService } from 'app/shared/services/user.service';
import { FormValidationModule } from '../accredited/form/form-validation/form.validation.module';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    DatatableModule,
    FormValidationModule
  ],
  declarations: [
    UsersComponent,
    FormComponent,
    ListComponent
  ],
  exports: [
    FormComponent,
    UsersComponent,
    ListComponent
  ],
  providers: [UserService, UzerService]
})

export class UsersModule { }



