import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core/core';
import { DatePickeri18Module } from './datepicker18n/datepicker-18n.module';

@NgModule({
    imports: [
        DatePickeri18Module,
    ],
    exports: [
        DatePickeri18Module,
    ],
    providers: []
})
export class SharedModule { }