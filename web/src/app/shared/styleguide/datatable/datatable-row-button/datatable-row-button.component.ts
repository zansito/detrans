import { Component, ElementRef,
  Renderer2, EventEmitter } from '@angular/core';

import { DatatableButtonAbstractComponent } from './../datatable-button.abstract';

@Component({
  selector: 'app-datatable-row-button',
  templateUrl: './datatable-row-button.component.html',
  styles: ['a.btn.btn-link { padding-top: 0; padding-bottom: 0; }']
})
export class DatatableRowButtonComponent extends DatatableButtonAbstractComponent {

  constructor(elementRef: ElementRef,
    renderer: Renderer2) {
      super(elementRef, renderer);
  }
}
