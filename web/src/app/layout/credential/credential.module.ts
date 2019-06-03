import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular2-material/core';
import { CredentialComponent } from './credential.component';
import { CredentialRoutingModule } from './credential-routing.module';
import { FormComponent } from './form/form.component';
import { CredentialService } from './service/credential.service';
import { AccreditedService } from '../accredited/services/accredited.service';
import { DatePickerModule } from 'angular-io-datepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewComponent } from './view/view.component';
import { HistoryComponent } from './history/history.component';
import { DatatableModule } from '../../shared/styleguide/datatable/datatable.module';
import { HistoryDetailComponent } from 'app/layout/credential/history/history-detail/history-detail.component';
import { UserService } from '../users/domain/user.service';
import { FormValidationModule } from '../accredited/form/form-validation/form.validation.module';

@NgModule({
  imports: [
    CommonModule,
    CredentialRoutingModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OverlayModule,
    DatePickerModule,
    PdfViewerModule,
    DatatableModule,
    FormValidationModule
  ],
  declarations: [
    ViewComponent,
    FormComponent,
    HistoryComponent,
    HistoryDetailComponent
  ],
  exports: [ViewComponent],
  providers: [CredentialService, AccreditedService, UserService, UserService]
})
export class CredentialModule {}


