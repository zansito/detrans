import { Component, OnInit, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { LoginService } from '../../../login/domain/login.service';
import { User } from '../domain/user.model';
import { Subject } from 'rxjs/Subject';
import { ListTemplateComponent } from 'app/shared/template.list.component';
import { UserService } from '../domain/user.service';
import { UzerService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: "list-component",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent extends ListTemplateComponent implements OnInit {
  user: User;
  loggedUser: User;
  finalUser: User;
  private headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.loginService.getToken()
  });

  listOptions = {
    headers: this.headers,
    url: 'http://localhost:8080/users',
    limit: 15,
    columns: [
      {
        prop: 'name',
        size: 4,
        label: { value: 'NOME' }
      },
      {
        prop: 'email',
        size: 2,
        label: { value: 'E-mail' }
      },
      {
        prop: 'enabled',
        size: 1,
        label: { value: 'Status' },
        beforeRenderCell: row => {
          if (row.enabled) {
            return 'ATIVO';
          }
          return 'INATIVO';
        }
      }
    ],
    buttons: [
      {
        event: 'click',
        command: 'onNew',
        label: { value: 'lms.pages.learning.pages.accounts.createNewAcc' },
        class: 'btn-primary'
      }
    ],
    rowButtons: [
      {
        event: 'click',
        command: 'edit',
        label: { value: 'edit' },
        icon: 'edit'
      },
      {
        event: 'click',
        command: 'inactive',
        label: { value: 'remove_circle' },
        icon: 'remove_circle',
        show: row => {
          if (row.enabled) {
            return true;
          }
        },
        prompt: {
          title: 'Desativar usuário',
          message: 'Tem certeza que deseja desativar o usuário?'
        }
      },
      {
        event: 'click',
        command: 'active',
        label: { value: 'donut_large' },
        icon: 'donut_large',
        show: row => {
          if (!row.enabled) {
            return true;
          }
        },
        prompt: {
          title: 'Ativar usuário',
          message: 'Tem certeza que deseja ativar o usuário?'
        }
      }
    ],
    filters: [
      {
        param: 'searchBy',
        label: { value: 'Buscar por' },
        multiple: false,
        options: [
          { label: { value: 'Email' }, value: 'EMAIL' },
          { label: { value: 'Nome' }, value: 'NAME' },
          { label: { value: 'Ativo' }, value: 'ACTIVE' },
          { label: { value: 'Inativo' }, value: 'INACTIVE' }
        ]
      }
    ]
  };

  users: User[] = [];
  modal = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private injector: Injector,
    private userService: UserService,
    private uzer: UzerService,
    private toast: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.loggedUser = this.loginService.getCurrentUser();
    this.uzer
      .getUserData(this.loggedUser.username)
      .subscribe(res => (this.finalUser = res));
  }

  edit(user: User) {
    if (this.finalUser.admin) {
      this.router.navigate([`layout/users/edit/`, user.id]);
    } else {
      this.toast.error('Você não tem permissão para esta ação!', 'Erro');
    }
  }

  disableUser(user: User) {
    this.router.navigate(['layout/credencial/view/', user.id]);
  }

  inactive(row) {
    row.enabled = false;
    this.userService.createUser(row).subscribe();
    this.modal = true;
  }

  active(row) {
    row.enabled = true;
    this.userService.createUser(row).subscribe();
    this.modal = true;
  }

  onNew() {
    if (this.finalUser.admin) {
      this.router.navigate(['/layout/users/novo']);
    } else {
      this.toast.error('Você não tem permissão para esta ação!', 'Erro');
    }
  }
}




