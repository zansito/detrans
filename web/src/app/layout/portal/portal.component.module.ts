import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbCarouselModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule as Ng2Charts } from "ng2-charts";
import { PortalComponent } from "./portal.component";
import { PortalRoutingModule } from "./portal.routing.module";

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        PortalRoutingModule,
        Ng2Charts,
    ],
    declarations: [
        PortalComponent

    ]
})
export class PortalModule { }
