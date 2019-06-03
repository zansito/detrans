import { Component, Input,
  Output, EventEmitter } from '@angular/core';

import { IDatatablePage,
  IDatatableSearchParam,
  IDatatableFilterOption,
  IDatatableFilter,
  IDatatableSearch,
  DatatableFactory } from 'app/shared/datatable';

@Component({
  selector: 'app-datatable-search',
  templateUrl: './datatable-search.component.html',
  styleUrls: ['./datatable-search.component.scss']
})
export class DatatableSearchComponent {

  @Input() page: IDatatablePage;
  @Output() onSearch: EventEmitter<IDatatablePage>;

  constructor() {
    this.onSearch = new EventEmitter<IDatatablePage>();
  }

  public setSearch(rawSearch: IDatatableSearch) {
    this.page.search = DatatableFactory.search(rawSearch);
    this.onSearch.emit(this.page);
  }

  public addParam(rawParam: IDatatableSearchParam) {
    this.addParamOnly(rawParam);
    this.page.rewind();
    this.onSearch.emit(this.page);
  }

  public addParamOnly(rawParam: IDatatableSearchParam) {
    this.page.search.addParam(DatatableFactory.searchParam(rawParam));
  }

  public setParam(rawParam: IDatatableSearchParam) {
    this.setParamOnly(rawParam);
    this.page.rewind();
    this.onSearch.emit(this.page);
  }

  public setParamOnly(rawParam: IDatatableSearchParam) {
    this.page.search.setParam(DatatableFactory.searchParam(rawParam));
  }

  public removeParam(rawParam: IDatatableSearchParam) {
    this.removeParamOnly(rawParam);
    this.page.rewind();
    this.onSearch.emit(this.page);
  }

  public removeParamOnly(rawParam: IDatatableSearchParam) {
    this.page.search.removeParam(DatatableFactory.searchParam(rawParam));
  }

  public setLimit(limit: number) {
    this.page.limit = limit;
    this.onSearch.emit(this.page);
  }

  onSearchClicked(search) {
    this.page.search.setPattern(search.value);
    this.page.rewind();
    this.onSearch.emit(this.page);
  }
}
