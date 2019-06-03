import {
  Component,
  OnInit,
  Injector,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../login/domain/login.service';
import { ListTemplateComponent } from 'app/shared/template.list.component';
import { ListComponent } from '../../users/list/list.component';
import { AccreditedHistory } from '../../accredited/domain/accredited-history.model';
import { CustomDatePipe } from '../../accredited/history/custom-date.pipe';
import { CredentialHistory } from '../domain/credential.history';

@Component({
  selector: "app-history-credential",
  templateUrl: "/history.component.html",
  styleUrls: ['/history.component.scss'],
  providers: [CustomDatePipe]
})
export class HistoryComponent extends ListTemplateComponent implements OnInit {
  private headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.loginService.getToken()
  });

  private selectedRow;
  private userid;
  private prevId;
  public historyid;
  public pastCredential: CredentialHistory;

  @ViewChild("comp") ListComponent;

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
          { label: { value: 'Criado' }, value: 'CRIADO' },
          { label: { value: 'Data' }, value: 'DEFICIENTE' }
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

  }

  getUrl() {
    const id = this.route.params.subscribe(params => {
      this.userid = params['id'];
      if (!this.userid) {
        return;
      }
    });
    return `http://localhost:8080/credential/history/${this.userid}`;
  }

  detail(credential: CredentialHistory) {
    const arr = this.datatable.page.rows;
    const fd = this.find(arr, credential);

    this.router.navigate([
      'layout/credencial/history/detail/',
      this.userid,
      this.prevId === -Infinity ? 0 : this.prevId,
      credential.credential_id,
      credential.id
    ]);
  }

  find(values, credential) {
    values.map(i => i.id);

    const myArray = values.map(i => i.id);
    const myValue = credential.id;

    function BiggerThan(inArray) {
      return inArray > myValue;
    }

    function LesserThan(inArray) {
      return inArray < myValue;
    }

    const arrLesserElements = myArray.filter(LesserThan);
    const prevElement = Math.max.apply(null, arrLesserElements);

    this.prevId = prevElement;
  }

  cancel() {
    window.history.back();
  }

  inactive() {}
}
