import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccreditedRoutingModule } from '../accredited-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { FormErrorDisplayComponent } from './form-validation/form.component.validation';

@NgModule({
  imports: [
    CommonModule,
    AccreditedRoutingModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgbDatepicker
  ],
  declarations: [FormComponent],
  providers: []
})

export class FormModule {
}


