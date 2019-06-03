import { IDatatableColumn } from './';

export class DatatableColumn implements IDatatableColumn {
  constructor(public prop,
    public size=1,
    public alignment="left",
    public label?,
    public beforeRenderCell?,
    public beforeRenderCellTitle?) { }
}
