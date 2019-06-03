import { IDatatableLabel, IDatatableFilterOption } from './';

export interface IDatatableFilter {
  multiple: boolean;
  param: string;
  label: IDatatableLabel;
  options: IDatatableFilterOption[];
}
