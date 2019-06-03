import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCarouselModule, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from "../../../users/domain/user.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [UserService, UserService]
})

export class HistoryDetailModule {
}


