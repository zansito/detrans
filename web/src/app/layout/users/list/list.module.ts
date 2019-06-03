import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';
import { DatatableModule } from 'app/shared/styleguide/datatable/datatable.module';
import { UzerService } from '../../../shared/services/user.service';

@NgModule({
  declarations: [
    CommonModule,
    DatatableModule
  ],
  imports: [CommonModule],
  exports: [ListComponent],
  providers: [UzerService],
})
export class FeatureModule { }


