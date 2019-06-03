import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccreditedRoutingModule } from './accredited-routing.module';
import { AccreditedComponent } from './accredited.component';
import { FormsModule } from '@angular/forms/';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { DatePickeri18Module } from '../../shared/datepicker18n/datepicker-18n.module';
import { AccreditedService } from './services/accredited.service';
import { DatePickerModule } from 'angular-io-datepicker/src/datepicker/index';
import { OverlayModule } from '@angular2-material/core'
import { InactiveModalComponent } from './list/inactive-modal/inactive-modal.component';
import { NgbdAlertCloseable } from '../../shared/alert/alert.component';
import { AccreditedUploadFileService } from 'app/layout/accredited/services/accredited.upload-file.service';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgUploaderModule } from 'ngx-uploader';
import { UzerService } from '../../shared/services/user.service';
import { FormValidationModule } from './form/form-validation/form.validation.module';
import { DatatableModule } from '../../shared/styleguide/datatable/datatable.module';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history/history-detail/history-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AccreditedRoutingModule,
    NgbCarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OverlayModule,
    DatePickerModule,
    HttpClientModule,
    NgUploaderModule,
    FormValidationModule,
    DatatableModule
  ],
  declarations: [
    AccreditedComponent,
    FormComponent,
    ListComponent,
    HistoryComponent,
    HistoryDetailComponent,
    InactiveModalComponent,
    FileUploadComponent,
    NgbdAlertCloseable
  ],
  exports: [AccreditedComponent],
  providers: [AccreditedService, UzerService, AccreditedUploadFileService]
})
export class AccreditedModule {}


