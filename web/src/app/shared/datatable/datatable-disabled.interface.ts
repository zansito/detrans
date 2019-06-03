import { IDatatableLabel } from './';

export interface IDatatableDisabled {
  condition: Function;
  message?: IDatatableDisabledMessage;
}

export interface IDatatableDisabledMessage {
  label: IDatatableLabel;
  clazz?: string;
}
