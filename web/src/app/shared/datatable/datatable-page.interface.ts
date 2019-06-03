import { IDatatableSearch,
  IDatatableColumn,
  IDatatableFilter,
  IDatatableLabel,
  IDatatableButton,
  IDatatableLayout,
  IDatatableDisabled,
} from './';

export interface IDatatablePage {

  limit: number;
  offset: number;

  apiPagination: boolean;

  modelFactory: any;

  layout: IDatatableLayout;

  emptyMessage: IDatatableLabel;
  rowSelection: Function;
  highlightRow: Function;

  columns: IDatatableColumn[];
  search?: IDatatableSearch;
  rowButtons?: IDatatableButton[];
  buttons?: IDatatableButton[];
  filters?: IDatatableFilter[];

  rows?: any[];

  hasNext: boolean;
  hasPrev: boolean;
  number: number;

  disabled: IDatatableDisabled;

  limits?: number[];

  getUrl();
  next();
  prev();
  rewind();
  setRows(data);
}
