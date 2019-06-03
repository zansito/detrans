import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbModule, NgbDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CredentialRoutingModule } from '../credential-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { DatePickerModule } from 'angular-io-datepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewComponent } from './view.component';

@NgModule({
  imports: [
    CommonModule,
    CredentialRoutingModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModal,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
    }),
    DatePickerModule,
    PdfViewerModule,
  ],
  declarations: [ViewComponent],
  providers: [DatePipe]
})

export class ViewModule { }


