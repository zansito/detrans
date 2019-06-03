import {
  Component,
  OnInit,
  Injector,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Accredited } from '../domain/accredited.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../login/domain/login.service';
import { ListTemplateComponent } from 'app/shared/template.list.component';
import { AccreditedHistory } from '../domain/accredited-history.model';
import { ListComponent } from '../../users/list/list.component';
import { CustomDatePipe } from './custom-date.pipe';

@Component({
  selector: 'history-component',
  templateUrl: '/history.component.html',
  styleUrls: ['/history.component.scss'],
  providers: [CustomDatePipe]
})
export class HistoryComponent extends ListTemplateComponent implements OnInit {
  private headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.loginService.getToken()
  });

  private selectedRow;
  private userid;
  private prevId;
  public pastAccredited: AccreditedHistory;

  @ViewChild('comp') ListComponent;

  listOptions = {
    headers: this.headers,
    url: this.getUrl(),
    limit: 15,
    columns: [
      {
        prop: 'changedat',
        size: 4,
        label: { value: 'Data da alteração' },
        beforeRenderCell: row => {
          const date = row.changedat;
          return this.customDatePipe.transform(date);
        }
      },
      {
        prop: 'action',
        size: 2,
        label: { value: 'Ação' }
      }
    ],
    buttons: [
      {
        event: 'click',
        command: 'onNew',
        label: { value: 'new' },
        class: 'btn-primary'
      }
    ],
    rowButtons: [
      {
        event: 'click',
        command: 'detail',
        label: { value: 'find_replace' },
        icon: { value: 'xdddddddddddddd' }
      }
    ],
    filters: [
      {
        param: 'filterBy',
        label: { value: 'Ordenar' },
        multiple: false,
        options: [
          { label: { value: 'Alterado' }, value: 'ALTERADO' },
          { label: { value: 'Criado' }, value: 'CRIADO' }
        ]
      }
    ]
  };

  constructor(
    private http: Http,
    private router: Router,
    private injector: Injector,
    private loginService: LoginService,
    private customDatePipe: CustomDatePipe,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    console.log();
  }

  getUrl() {
    const id = this.route.params.subscribe(params => {
      this.userid = params['id'];
      if (!this.userid) {
        return;
      }
    });
    return `http://localhost:8080/accredited/${this.userid}/history`;
  }

  detail(accredited: AccreditedHistory) {
    const arr = this.datatable.page.rows;
    const fd = this.find(arr, accredited);

    this.router.navigate([
      'layout/accredited/history/detail/',
      this.userid,
      accredited.id,
      this.prevId === -Infinity ? 0 : this.prevId
    ]);
  }

  find(values, accredited) {
    values.map(i => i.id);

    const myArray = values.map(i => i.id);
    const myValue = accredited.id;

    function BiggerThan(inArray) {
      return inArray > myValue;
    }

    function LesserThan(inArray) {
      return inArray < myValue;
    }

    const arrLesserElements = myArray.filter(LesserThan);
    const prevElement = Math.max.apply(null, arrLesserElements);

    this.prevId = prevElement;

    // values.map(previous => {
    //   this.pastAccredited = values.filter(x => x.id === this.prevId)[0];
    // })
  }

  cancel() {
    window.history.back();
  }

  inactive() {}
}
