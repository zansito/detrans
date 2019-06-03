import { NgModule } from '@angular/core';

import { HistoryComponent } from './history.component';
import { DatatableModule } from 'app/shared/styleguide/datatable/datatable.module';
import { CommonModule } from '@angular/common';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { UserService } from 'app/layout/users/domain/user.service';

@NgModule({
  imports: [
    CommonModule,
    DatatableModule
  ],
  exports: [],
  declarations: [HistoryComponent],
  providers: [UserService, UserService]
})
export class HistoryModule {}
