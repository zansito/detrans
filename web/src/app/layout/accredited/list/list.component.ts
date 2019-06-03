import { Component, OnInit, Injector } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Accredited } from '../domain/accredited.model';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/domain/login.service';
import { ListTemplateComponent } from 'app/shared/template.list.component';
import { AccreditedService } from '../services/accredited.service';

@Component({
  selector: 'list-component',
  templateUrl: '/list.component.html',
  styleUrls: ['/list.component.scss'],
  providers: [],
})
export class ListComponent extends ListTemplateComponent implements OnInit {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.loginService.getToken()
  });

  private selectedRow;

  listOptions = {
    headers: this.headers,
    url: 'http://localhost:8080/accredited',
    limit: 15,
    columns: [
      {
        'prop': 'name',
        'size': 4,
        'label': { 'value': 'Nome' }
      },
      {
        'prop': 'cpf',
        'size': 2,
        'label': { 'value': 'CPF' }
      },
      {
        'prop': 'typeEnum',
        'size': 2,
        'label': { 'value': 'Tipo' }
      },
      {
        'prop': 'statusEnum',
        'size': 1,
        'label': { 'value': 'Status' }
      }
    ],
    buttons: [
      {
        'event': 'click',
        'command': 'onNew',
        'label': { 'value': 'new' },
        'class': 'btn-primary'
      }
    ],
    rowButtons: [
      {
        'event': 'click',
        'command': 'edit',
        'label': { 'value': 'edit' },
        'icon': 'edit'
      },
      {
        'event': 'click',
        'command': 'openCredential',
        'label': { 'value': 'time_to_leave' },
        'icon': 'time_to_leave'
      },
      {
        'event': 'click',
        'command': 'history',
        'label': { 'value': 'find_replace' },
        'icon': 'find_replace'
      },
    ],
    filters: [
      {
        'param': 'searchBy',
        'label': { 'value': 'Buscar por' },
        'multiple': false,
        'options': [
          { 'label': { 'value': 'CPF' }, 'value': 'CPF' },
          { 'label': { 'value': 'Status' }, 'value': 'statusEnum' },
        ]
      },
      {
        'param': 'filterBy',
        'label': { 'value': 'Tipo de credencial' },
        'multiple': false,
        'options': [
          { 'label': { 'value': 'Idoso' }, 'value': 'IDOSO' },
          { 'label': { 'value': 'Deficiente' }, 'value': 'DEFICIENTE' },
          { 'label': { 'value': 'Infantil' }, 'value': 'INFANTIL' },
          { 'label': { 'value': 'Gestante' }, 'value': 'GESTANTE' },
        ]
      }
    ],
  }

  dtOptions: any = {};
  accrediteds: Accredited[] = [];
  dtTrigger: Subject<Accredited> = new Subject();
  selectedAccredited: Accredited;
  modal = false;
  credentialModal = false;
  accredited = Accredited;

  constructor(private http: Http,
    private router: Router,
    private injector: Injector,
    private accreditedService: AccreditedService,
    private loginService: LoginService) {
    super()
  }

  ngOnInit() {

  }


  edit(accredited: Accredited) {
    this.selectedAccredited = accredited;
    this.router.navigate(['layout/accredited/edit', accredited.id]);
  }

  openCredential(accredited: Accredited) {
    this.selectedAccredited = accredited;
    this.router.navigate(['layout/credencial/view/', accredited.id]);
    this.credentialModal = true;
  }

  history(accredited: Accredited) {
    this.router.navigate(['layout/accredited/history/', accredited.id]);
  }

  inactive (accredited: Accredited) {
    accredited.statusEnum = 'INATIVO';
    this.accreditedService.save(accredited).subscribe();
    this.modal = true;
  }

  active(accredited: Accredited) {
    accredited.statusEnum = 'ATIVO';
    this.accreditedService.save(accredited).subscribe();
    this.modal = true;
  }

}

export class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
