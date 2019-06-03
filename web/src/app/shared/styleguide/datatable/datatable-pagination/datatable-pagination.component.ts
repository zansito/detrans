import {
  Component, Input,
  OnInit, Output, EventEmitter
} from '@angular/core';

import { IDatatablePage } from 'app/shared/datatable';

@Component({
  selector: 'app-datatable-pagination',
  template: `
    <div
      id="area-nav-button"
      class="pull-right">
      <button class="btn btn-primary"
        (click)="onPrevClicked()"
        [disabled]="page.offset <= 0"> &lt;&lt; </button>
      <button class="btn btn-primary"
        (click)="onNextClicked()"
      > &gt;&gt; </button>
    </div>
  `,
})
export class DatatablePaginationComponent implements OnInit {

  @Input() page;

  @Output() onNext: EventEmitter<IDatatablePage>;
  @Output() onPrev: EventEmitter<IDatatablePage>;

  constructor() {
    this.onNext = new EventEmitter<IDatatablePage>();
    this.onPrev = new EventEmitter<IDatatablePage>();
  }

  ngOnInit() {
  }

  onNextClicked() {
    this.page.next();
    return this.onNext.emit(this.page);
  }

  onPrevClicked() {
    this.page.prev();
    return this.onPrev.emit(this.page);

  }
}
