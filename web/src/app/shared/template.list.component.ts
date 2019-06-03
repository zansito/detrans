import { ViewChild } from '@angular/core';

import { IDatatableAction } from 'app/shared/datatable';
import { DatatableComponent } from './styleguide/datatable/datatable/datatable.component';


export abstract class ListTemplateComponent {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  onReact(action: IDatatableAction) {
    this[action.command](...action.args);
  }
}