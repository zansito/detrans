import { DatatablePage } from './datatable-page';
import { IDatatablePage } from './datatable-page.interface';

import { DatatableSearch } from './datatable-search';
import { IDatatableSearch } from './datatable-search.interface';

import { DatatableSearchParam } from './datatable-search-param';
import { IDatatableSearchParam } from './datatable-search-param.interface';

import { DatatableColumn } from './datatable-column';
import { IDatatableColumn } from './datatable-column.interface';

import { IDatatableButton } from './datatable-button.interface';

import { DatatableFilter } from './datatable-filter';
import { IDatatableFilter } from './datatable-filter.interface';

import { DatatableFilterOption } from './datatable-filter-option';
import { IDatatableFilterOption } from './datatable-filter-option.interface';

import { DatatableLabel } from './datatable-label';
import { IDatatableLabel } from './datatable-label.interface';

import { DatatablePrompt } from './datatable-prompt';
import { IDatatablePrompt } from './datatable-prompt.interface';

import { isIDatatableLayout, DatatableLayoutFactory } from './datatable-layout';
import { IDatatableLayout } from './datatable-layout.interface';

import { ButtonFactory } from '../button/button';
import { ActionFactory } from '../action';

import { DatatableDisabled, DatatableDisabledMessage } from './datatable-disabled';
import { IDatatableDisabled, IDatatableDisabledMessage } from './datatable-disabled.interface';

export abstract class DatatableFactory {

  public static page(rawPage: any): IDatatablePage {

    const page = new DatatablePage(
      rawPage.url,
      rawPage.offset
    );

    DatatableFactory._setLimit(rawPage.limit, page);

    page.modelFactory = rawPage.modelFactory;
    page.layout = DatatableFactory.layout(rawPage.layout);

    page.emptyMessage = DatatableFactory.emptyMessage(rawPage.emptyMessage);
    page.rowSelection = rawPage.rowSelection;
    page.highlightRow = rawPage.highlightRow;

    page.search = DatatableFactory.search(rawPage.search);
    page.columns = DatatableFactory.__columns(rawPage.columns);
    page.filters = DatatableFactory.__filters(rawPage.filters);

    page.rowButtons = DatatableFactory.__buttons(rawPage.rowButtons);
    page.buttons = DatatableFactory.__buttons(rawPage.buttons);

    page.patternParam = rawPage.patternParam || page.patternParam;

    page.disabled = DatatableFactory.disabled(rawPage.disabled);

    return page;
  }

  public static layout(rawLayout: any): IDatatableLayout {
    if (!rawLayout)
      return DatatableLayoutFactory.getDefault();

    if (isIDatatableLayout(rawLayout))
      return rawLayout;

    return DatatableLayoutFactory.get(rawLayout);
  }

  /* Button */
  public static button(rawButton: any): IDatatableButton {
    return ButtonFactory.get({
      label: DatatableFactory.label(rawButton.label||{}),
      class: rawButton['class'],
      icon: rawButton.icon,
      enabled: rawButton.enabled||function(){return true},
      visible: rawButton.visible||function(){return true},
      show: rawButton.show||function(){return true},
      action: ActionFactory.get(rawButton),
      children: DatatableFactory.__buttons(rawButton.children)
    });
  }

  /* Search */
  public static search(rawSearch: any = {}): IDatatableSearch {
    return new DatatableSearch(
      rawSearch.pattern,
      DatatableFactory.__searchParams(rawSearch.params));
  }

  /* SearchParam */
  public static searchParam(rawSearchParam: any = {}): IDatatableSearchParam {
    return new DatatableSearchParam(
      rawSearchParam.key,
      rawSearchParam.value);
  }

  /* Column */
  public static column(rawColumn: any): IDatatableColumn {
    return new DatatableColumn(
      rawColumn.prop,
      rawColumn.size,
      rawColumn.alignment,
      DatatableFactory.label(rawColumn.label||{}),
      rawColumn.beforeRenderCell,
      rawColumn.beforeRenderCellTitle
    );
  }

  /* Label */
  public static label(rawLabel: any): IDatatableLabel {

    let label = rawLabel;

    if (!rawLabel || !rawLabel.value)
      rawLabel = { value: '', i18n: false }

    if (typeof label === 'string')
      rawLabel = { value: label }

    return new DatatableLabel(
      rawLabel.value,
      rawLabel.i18n,
      rawLabel.alignment);
  }

  /* Filter */
  public static filter(rawFilter: any): IDatatableFilter {
    return new DatatableFilter(
      rawFilter.multiple,
      rawFilter.param,
      DatatableFactory.label(rawFilter.label),
      DatatableFactory.__filterOptions(rawFilter.options));
  }

  /* Filter Option */
  public static filterOption(rawFilterOption: any): IDatatableFilterOption {
    return new DatatableFilterOption(
      rawFilterOption.value,
      DatatableFactory.label(rawFilterOption.label));
  }

  /* Prompt */
  public static prompt(rawPrompt: any): IDatatablePrompt {
     if (!rawPrompt)
      return;

    if (typeof rawPrompt !== 'object')
      rawPrompt = {};

     if (!rawPrompt.title) {
      rawPrompt.title = { value: 'styleguide.prompt.title' }
    }

    return new DatatablePrompt(
      DatatableFactory.label(rawPrompt.title),
      DatatableFactory.label(rawPrompt.message),
      rawPrompt.answer);
  }

  /* Disabled */
  public static disabled(rawDisabled: any): IDatatableDisabled {
    return new DatatableDisabled(
      rawDisabled && rawDisabled.condition ? rawDisabled.condition : () => false ,
      DatatableFactory.disabledMessage(
        rawDisabled && rawDisabled.message ? rawDisabled.message : {}
      ),
    );
  }

  public static disabledMessage(rawDisabledMessage: any): IDatatableDisabledMessage {
    const defaultClazz = 'danger';
    return new DatatableDisabledMessage(
      DatatableFactory.label(rawDisabledMessage.label || 'styleguide.datatable.disabledMessage'),
      rawDisabledMessage.clazz || defaultClazz
    );
  }

  /* Empty Message */
  public static emptyMessage(rawEmptyMessage: any): IDatatableLabel {
    return DatatableFactory.label(rawEmptyMessage || 'Nenhum registro encontrado ');
  }

  private static _setLimit(limit: number|number[] = 10, page: IDatatablePage): void {

    if (typeof limit === 'number') {
      page.limit = limit;
      page.limits = [];
      return;
    }

    page.limit = limit[0];
    page.limits = limit;
  }

  private static __buttons(rawButtons: any[]): IDatatableButton[] {
    return Array.isArray(rawButtons) ? rawButtons.map(
      rawButton => DatatableFactory.button(rawButton)
    ) : [];
  }

  private static __searchParams(rawSearchParams: any[]): IDatatableSearchParam[] {
    return Array.isArray(rawSearchParams) ? rawSearchParams.map(
      rawSearchParam => DatatableFactory.searchParam(rawSearchParam)
    ) : [];
  }

  private static __columns(rawColumns: any[]): IDatatableColumn[] {
    return Array.isArray(rawColumns) ? rawColumns.map(
      rawColumn => DatatableFactory.column(rawColumn)
    ) : [];
  }

  private static __filters(rawFilters: any[]): IDatatableFilter[] {
    return Array.isArray(rawFilters) ? rawFilters.map(
      rawFilter => DatatableFactory.filter(rawFilter)
    ) : [];
  }

  private static __filterOptions(rawFilterOptions: any[]): IDatatableFilterOption[] {
    return Array.isArray(rawFilterOptions) ? rawFilterOptions.map(
      rawFilterOption => DatatableFactory.filterOption(rawFilterOption)
    ) : [];
  }
}
