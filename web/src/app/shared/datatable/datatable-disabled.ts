import { IDatatableDisabled, IDatatableDisabledMessage } from './';

export class DatatableDisabled implements IDatatableDisabled {
  constructor(public condition, public message) { }
}

export class DatatableDisabledMessage implements IDatatableDisabledMessage {
  constructor(public label, public clazz) { }
}
