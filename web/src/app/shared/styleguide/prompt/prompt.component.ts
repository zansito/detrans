import { Component, OnInit,
  ViewChild, EventEmitter, Output, Injector
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { ModalComponent } from 'app/shared/styleguide/modal/modal.component';
import { IAction } from 'app/shared/action';
import { ILabel } from 'app/shared/label';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html'
})
export class PromptComponent implements OnInit {

  @Output() onConfirm: EventEmitter<IAction>;
  @Output() onCancel: EventEmitter<void>;
  @ViewChild('modal') public modal: ModalComponent;

  action: IAction;

  public constructor(private injector: Injector,
    private translateService: TranslateService) {
    this.onConfirm = new EventEmitter<IAction>();
    this.onCancel = new EventEmitter<void>();
    this.action = this.injector.get('action');
  }

  ngOnInit() {
    this._prepare(this.action);
    this.show();
  }

  public show() {
    this.modal.show();
  }

  protected onModalConfirm(answer) {
    this.action.args.push(answer);
    this.onConfirm.emit(this.action);
    this.modal.hide();
  }

  protected onModalCancel() {
    this.modal.hide();
    this.onCancel.emit();
  }

  private _prepare(action: IAction): void {
    this._translate(action.prompt.title);
  }

  private _translate(label: ILabel): void {
    if (!label.i18n)
      return;
    this.translateService.get(label.value).subscribe(
      (translated: string) => label.value = translated
    );
  }
}
