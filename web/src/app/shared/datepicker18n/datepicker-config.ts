import {Component} from '@angular/core';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";

@Component({
    selector: 'ngbd-datepicker-config',
    templateUrl: './datepicker-config.html',
    styleUrls: ['./datepicker-style.css'],
    providers: [NgbDatepickerConfig]
})
export class NgbdDatepickerConfig {

    model;

    constructor(config: NgbDatepickerConfig) {
        config.minDate = {year: 1900, month: 1, day: 1};
        config.maxDate = {year: 2099, month: 12, day: 31};
    }
}