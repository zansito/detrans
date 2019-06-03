import { Input, Component } from '@angular/core';

@Component({
    selector: 'ngbd-alert-closeable',
    templateUrl: './alert.component.html'
})
export class NgbdAlertCloseable {

    @Input()
    public alerts: Array<IAlert> = [];

    private backup: Array<IAlert>;

    constructor() {
        this.alerts.push({
            id: null,
            type: null,
            message: 'null',
        });
        this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    public reset() {
        this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
    }
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}