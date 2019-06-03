import {
  mergeInUrl,
  getRedundant,
  getParamDTOFromArray
} from 'app/shared/functions/query-param.parser';

import { IDatatablePage } from './datatable-page.interface';

class DatatablePage implements IDatatablePage {

  public emptyMessage;
  public rowSelection;
  public highlightRow;

  public modelFactory;

  public layout;

  public search;
  public columns;
  public rows = [];
  public rowButtons;
  public buttons;
  public filters;

  public apiPagination = false;

  public hasNext = false;
  public hasPrev = false;
  public number = 1;

  public patternParam = 'pattern';

  public disabled;

  public limits?: number[];

  constructor(private url,
    public limit = 10,
    public offset = 0) { }

  public next(): void {
    this.number++;
    this.hasPrev = true;
    this.offset = this.limit * (this.number - 1);
  }

  public prev(): void {
    if (this.offset <= 0) return;
    this.number--;
    this.offset = this.limit * (this.number - 1);
  }

  public getUrl(): string {

    const url = { href: this.url };

    /**
     * Limit on the url query param need to be increased by 1 to
     * check if there's next page
     */
    this.limit++;
    mergeInUrl({'limit': this.limit}, url);
    this.limit--;
    mergeInUrl({'pageSize': this.limit}, url);

    mergeInUrl({'offset': this.offset}, url);
    mergeInUrl({'page': this.number}, url);

    url.href += getRedundant(getParamDTOFromArray(this.search.params));

    mergeInUrl({[this.patternParam]: this.search.pattern}, url);

    return url.href;
  }

  public rewind(): void {
    this.offset = 0;
    this.number = 1;
  }

  public setRows(data): void {
    this.rows = data.map(row => {
      if (!this.modelFactory)
        return row;

      return this.modelFactory.create(row);
    });

    /**
     * Handle "hasPrev" and "hasNext".
     */
    this.__paginate();

    /**
     * If fetched data exceeds, the requested limit,
     * remove the last row from this page.
     */
    this.__removeExtraItems();
  }

  private __paginate() {
    if (!this.apiPagination) {
      this.hasNext = this.rows.length > this.limit;
    }
    this.hasPrev = this.offset > 0;
  }

  private __removeExtraItems() {
    if (this.rows.length > this.limit  && !this.apiPagination) {
      this.rows.splice(-1);
    }
  }
}

export { IDatatablePage, DatatablePage }
