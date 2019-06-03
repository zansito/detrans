import { Component, ElementRef,
  Renderer2, EventEmitter } from '@angular/core';

import { IDatatableAction } from 'app/shared/datatable';
import { DatatableButtonAbstractComponent } from './../datatable-button.abstract';

@Component({
  selector: 'app-datatable-button',
  templateUrl: './datatable-button.component.html',
  styleUrls: ['./datatable-button.component.scss']
})
export class DatatableButtonComponent extends DatatableButtonAbstractComponent {

  constructor(elementRef: ElementRef,
    renderer: Renderer2) {
      super(elementRef, renderer);
  }
}
