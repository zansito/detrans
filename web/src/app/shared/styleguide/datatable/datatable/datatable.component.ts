import { Component, OnInit,
  Input, Output, EventEmitter,
  ViewChild, ViewContainerRef, DoCheck
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { IPrompt } from 'app/shared/prompt';
import { DatatableFactory, IDatatablePage,
  IDatatableColumn, IDatatableAction,
  IDatatableLabel, IDatatableFilter,
  IDatatableFilterOption,
  IDatatablePrompt,
  IDatatableButton,
  DatatableLayoutHeaderElementsEnum
} from 'app/shared/datatable';

import { IResolver } from 'app/shared/resolver';
import { PromptComponent } from 'app/shared/styleguide/prompt/prompt.component';

import { DatatableHttpService } from './../datatable-http.service';
import { DatatableSearchComponent } from './../datatable-search/datatable-search.component';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, DoCheck {

  @ViewChild(DatatableSearchComponent)
  public search: DatatableSearchComponent;

  @Input() options;
  @Output() onReaction: EventEmitter<IDatatableAction>;

  checkAllRowsField;

  public page: IDatatablePage;
  public selectedRows: any[] = [];

  private _disabled = false;

  private promptResolver: IResolver;

  private layoutOrderEnum = DatatableLayoutHeaderElementsEnum;

  constructor(private datatableHttp: DatatableHttpService,
    private translateService: TranslateService) {
    this.onReaction = new EventEmitter<IDatatableAction>();
  }

  ngOnInit() {
    this.setPage(this.prepare(DatatableFactory.page(this.options)));
  }

  ngDoCheck() {
    this._handleDisabledState();
  }

  public reload(data?: any[]) {
    this.ngOnInit();
  }

  public rewind() {
    this.page.rewind();
    this.setPage(this.page);
  }

  private prepare(page: IDatatablePage) {

    this.translate(page.emptyMessage);

    page.columns.forEach((column: IDatatableColumn) => {
      this.translate(column.label);
    });

    page.filters.forEach((filter: IDatatableFilter) => {
      this.translate(filter.label);
      filter.options.forEach((option: IDatatableFilterOption) => {
        this.translate(option.label);
      });
    });

    [...page.buttons, ...page.rowButtons].forEach(
      (a: IDatatableButton) => this.__i18nButton(a));

    return page;
  }

  private __i18nButton(button: IDatatableButton) {

    this.translate(button.label);

    button.action.prompt && [button.action.prompt.title,
      button.action.prompt.message].forEach(
      (_label: IDatatableLabel) => this.translate(_label));

    button.children && button.children.forEach(
      (_button: IDatatableButton) => this.__i18nButton(_button));
  }

  private translate(label: IDatatableLabel): void {
    if (!label.i18n)
      return;
    this.translateService.get(label.value).subscribe(
      (translated: string) => label.value = translated
    );
  }

  setPage(page: IDatatablePage) {

    this.page = page;

    if (this.page.disabled.condition()) { return; }

    this.datatableHttp.get(page).subscribe(_page => {
      this.selectedRows.length = 0;
      this._handleCheckAllRowsField();
      this._emitRowSelection();
      this.page = _page;
    });
  }

  setColumnSize(size: number) {
    let cssClasses = {};
    cssClasses[`col-md-${size}`] = true;
    return cssClasses;
  }

  setAlignment(align: string) {
    let cssClasses = {};
    cssClasses[`text-${align}`] = true;
    return cssClasses;
  }

  beforeRenderCell(row: any, column: IDatatableColumn) {
    return this._before('beforeRenderCell', row, column);
  }

  beforeRenderCellTitle(row: any, column: IDatatableColumn) {
    return this._before('beforeRenderCellTitle', row, column);
  }

  highlightRow(row: any) {
    if (!this.page.highlightRow) { return; }
    return this.page.highlightRow(row);
  }

  private _before(hook: string,
    row: any,
    column: IDatatableColumn) {

    let value = row[column.prop];

    if (column[hook])
      value = column[hook](row, column);

    return value;
  }

  onReact(action: IDatatableAction) {
    this.onReaction.emit(action);
    this._resetPrompt();
  }

  onPromptCancel() {
    this._resetPrompt();
  }

  onRowClicked(row: any, event: MouseEvent): void {

    if (event.ctrlKey && !this.checkRowSelection(row)) {
      this.selectedRows.length = 0;
      this.selectedRows.push(row);
    } else {
      this.__toggleRow(row);
    }

    this._handleCheckAllRowsField();
    this._emitRowSelection();
  }

  checkRowSelection(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  checkAllRows(): void {

    const cbk = this.page.rowSelection;

    this.selectedRows.length = 0;

    if (this.checkAllRowsField) {
      this.selectedRows = [...this.page.rows];
    }

    if (!cbk) { return; }

    cbk(this.selectedRows);
  }

  private __toggleRow(row: any): void {
    const i = this.selectedRows.indexOf(row);

    if (i < 0) {
      this.selectedRows.push(row);
      return;
    }

    this.selectedRows.splice(i, 1);
  }

  onPromptReceived(action: IDatatableAction) {
    this.promptResolver = {
      component: PromptComponent,
      inputs: { action },
      outputs: {
        onConfirm: { command: 'onReact', context: this },
        onCancel: { command: 'onPromptCancel', context: this }
      }
    };
  }

  isDisabled(): boolean {
    return this._disabled;
  }

  get totalColSpan() {
    const cols = this.page.columns.length;

    return cols +
      (this.page.rowSelection ? 1 : 0) +
      (this.page.rowButtons.length ? 1 : 0); /* cols + checkbox + actions */
  }

  private _handleDisabledState() {

    const disable = this.page.disabled.condition();

    if (this._disabled === disable) { return; }

    this._disabled = disable;

    if (this._disabled) { return; }

    this.setPage(this.page);
  }

  private _handleCheckAllRowsField() {
    this.checkAllRowsField = this.page.rows.length === this.selectedRows.length;
  }

  private _resetPrompt = () => this.promptResolver = undefined;

  private _emitRowSelection = () => {
    const cbk = this.page.rowSelection;
    cbk && cbk(this.selectedRows);
  }
}
