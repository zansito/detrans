import { IDatatableFilter } from './';

export class DatatableFilter implements IDatatableFilter {
  constructor(
    public multiple = false,
    public param,
    public label,
    public options
  ) { }
}
