import { Component, Input,
  EventEmitter, Output, OnInit } from '@angular/core';

import { IDatatablePage, IDatatableFilter,
  IDatatableFilterOption, DatatableFactory,
  IDatatableSearchParam
} from 'app/shared/datatable';

@Component({
  selector: 'app-datatable-filters',
  templateUrl: './datatable-filters.component.html',
  styleUrls: ['./datatable-filters.component.scss']
})
export class DatatableFiltersComponent implements OnInit {

  @Input() page: IDatatablePage;
  @Output() onAddParam: EventEmitter<IDatatableSearchParam>;
  @Output() onRemoveParam: EventEmitter<IDatatableSearchParam>;
  @Output() onRemoveParamOnly: EventEmitter<IDatatableSearchParam>;
  style;

  selectedFilterOptions: Map<IDatatableFilter, IDatatableFilterOption[]> = new Map();

  ngOnInit() {
    this.page.filters.forEach((filter: IDatatableFilter) => {
        this.selectedFilterOptions.set(filter, []);
    });
  }

  constructor() {
    this.onAddParam = new EventEmitter<IDatatableSearchParam>();
    this.onRemoveParam = new EventEmitter<IDatatableSearchParam>();
    this.onRemoveParamOnly = new EventEmitter<IDatatableSearchParam>();
  }

  onFilterOptionClicked(option: IDatatableFilterOption,
    filter: IDatatableFilter) {
      this.toggleParam(option, filter);
  }

  checkSelectedFilterOption(option: IDatatableFilterOption) {
    const optionsMap = this.selectedFilterOptions;

    let found = false;

    optionsMap.forEach(options => {
      if (options.includes(option)) {
        found = true;
      }
    });

    return found;
  }

  getStyle() {
    const profilePicUrl = 'display: none';

    return this.style;
  }

  toggleParam(option: IDatatableFilterOption,
    filter: IDatatableFilter) {

    const selectedFilterOptions = this.selectedFilterOptions.get(filter);

    const i = selectedFilterOptions.indexOf(option);
    const param = DatatableFactory.searchParam(
      this._getRawSearchParam(option, filter)
    );

    if (i > -1) {
      selectedFilterOptions.splice(i, 1);
      this.onRemoveParam.emit(param);
      return;
    }

    if (!filter.multiple) {
      selectedFilterOptions.forEach(_option => {
        this.onRemoveParamOnly.emit(DatatableFactory.searchParam(
          this._getRawSearchParam(_option, filter)
        ));
      });
      selectedFilterOptions.length = 0;
      selectedFilterOptions.push(option);
      this.onAddParam.emit(param);
      return;
    }

    selectedFilterOptions.push(option);
    this.onAddParam.emit(param);
  }

  private _getRawSearchParam(option, filter) {
    return {
      key: filter.param,
      value: option.value
    }
  }
}
