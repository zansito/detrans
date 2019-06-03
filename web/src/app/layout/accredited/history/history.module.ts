import { NgModule } from '@angular/core';
import { HistoryComponent } from './history.component';
import { CommonModule } from '@angular/common';
import { DatatableModule } from 'app/shared/styleguide/datatable/datatable.module';
import { UserService } from '../../users/domain/user.service';

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
  ],
  exports: [],
  declarations: [HistoryComponent],
  providers: [
    UserService
  ],
})
export class HistoryModule { }
