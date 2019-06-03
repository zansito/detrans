import { Input, Output,
  ElementRef, Renderer2, EventEmitter,
  OnInit, OnDestroy } from '@angular/core';

import { DatatableFactory, IDatatableAction,
  IDatatablePrompt,
  IDatatableButton} from 'app/shared/datatable';
import { Action, ActionFactory, IAction } from 'app/shared/action';

export abstract class DatatableButtonAbstractComponent implements OnInit, OnDestroy {

  @Input() button: IDatatableButton;
  @Input() row: any;
  @Input() parent: IDatatableAction;

  @Output() onReaction: EventEmitter<IDatatableAction>;
  @Output() onPrompt: EventEmitter<IDatatableAction>;

  private listener;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) {
      this.onReaction = new EventEmitter<IDatatableAction>();
      this.onPrompt = new EventEmitter<IDatatableAction>();
  }

  ngOnInit() {
    this.listener && this.listener();
    this.__setupButton(this.button);
  }

  ngOnDestroy() {
    /* Destroy the given listener to avoid memory leaks. */
    this.listener && this.listener();
  }

  onProxyReaction(action: IDatatableAction) {
    this.onReaction.emit(action);
  }

  onProxyPrompt(action: IDatatableAction) {
    this.onPrompt.emit(action);
  }

  protected setButtonIcon(button: IDatatableButton) {
    let cssClasses = {};

    if (button.icon) {
      cssClasses[`fluigicon ${button.icon}`] = true;
    }

    return cssClasses;
  }

  protected disableButton(button: IDatatableButton) {
    return !this.__evalCondition(button.enabled);
  }

  protected hideButton(button: IDatatableButton) {
    return !this.__evalCondition(button.show);
  }

  protected visibilityButton(button: IDatatableButton) {
    let visibilityCondition = this.__evalCondition(button.visible);
    return visibilityCondition ? '' : 'hidden';
  }

  private __setupButton(button: IDatatableButton) {

    !this.button.children.length && this.__setupListener(
      this.button, this.elementRef);
  }

  private __setupListener(button: IDatatableButton,
    elementRef: ElementRef) {
    /* Store the given listener to destroy it later. */
    this.listener = this.renderer.listen(
      elementRef.nativeElement,
      button.action.event,
      (e) => {
        if (this.disableButton(button)) {
          return;
        }
        this.__prompt(this.row, button.action);
      }
    );
  }

  private __prompt(row: any, action: IDatatableAction) {

    let args = [];

    if (row) { args.push(row); }
    args = [...args, ...action.args];

    const reaction = ActionFactory.get({
      command: action.command,
      args: args,
      prompt: action.prompt
    });

    if (!action.prompt) {
      this.__exec(reaction);
      return;
    }

    this.onPrompt.emit(reaction);
  }

  private __exec(reaction: IAction) {
    this.onReaction.emit(reaction);
  }

  private __evalCondition(cond: Function) {
    return cond(this.row);
  }
}
