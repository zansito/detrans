import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { CredentialRoutingModule } from '../credential-routing.module';
import { UzerService } from '../../../shared/services/user.service';
import { UserService } from '../../users/domain/user.service';
import { FormValidationModule } from 'app/layout/accredited/form/form-validation/form.validation.module';

@NgModule({
    imports: [
        CommonModule,
        CredentialRoutingModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        NgbDatepicker,
        FormValidationModule
    ],
    declarations: [FormComponent],
  providers: [UzerService, UserService]
})

export class FormModule { }


