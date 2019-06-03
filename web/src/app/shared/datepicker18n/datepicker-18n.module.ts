import { NgbdDatepickerI18nComponent } from "./datepicker-18n";
import { NgbModule, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { JsonpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgbdDatepickerConfig } from "./datepicker-config";
import { NgbDateFRParserFormatter } from "./datepicker.date-parser";

@NgModule ({
    imports: [FormsModule, ReactiveFormsModule, JsonpModule, NgbModule.forRoot ()],
    declarations: [NgbdDatepickerI18nComponent, NgbdDatepickerConfig],
    exports: [NgbdDatepickerI18nComponent, NgbdDatepickerConfig],
    providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})

export class DatePickeri18Module {

}
