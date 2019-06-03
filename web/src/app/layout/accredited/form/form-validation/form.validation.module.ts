import { NgModule } from '@angular/core';
import { FormErrorDisplayComponent } from './form.component.validation';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [FormErrorDisplayComponent],
  declarations: [FormErrorDisplayComponent],
  providers: [],
})
export class FormValidationModule { }
