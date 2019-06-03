import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryDetailComponent } from './history-detail.component';
import { CustomDatePipe } from '../custom-date.pipe';
import { UserService } from '../../../users/domain/user.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [HistoryDetailComponent],
  providers: [
    CustomDatePipe,
    UserService
  ]
})

export class HistoryDetailModule {
}


