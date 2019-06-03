import { IDatatableLabel } from './';

export interface IDatatableColumn {
  prop: string;
  label?: IDatatableLabel;
  size: number;
  beforeRenderCell?: Function;
  beforeRenderCellTitle?: Function;
  alignment: string;
}
