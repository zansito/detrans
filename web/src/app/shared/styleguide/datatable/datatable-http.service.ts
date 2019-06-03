import { Observable } from 'rxjs/Rx';
import { Injectable, Injector } from '@angular/core';

import { RestService } from 'app/shared/services/rest.service';
import { IDatatablePage } from 'app/shared/datatable';
import { LoginService } from '../../../login/domain/login.service';
import { Headers } from '@angular/http';

@Injectable()
export class DatatableHttpService extends RestService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.loginService.getToken()
  });

  constructor(injector: Injector, private loginService: LoginService) {
    super(injector);
  }

  public get(page: IDatatablePage): Observable<IDatatablePage> {
      return this.http.get(page.getUrl(), {headers: this.headers})
      .map(res => {

        /* check if API handles pagination */
        this._handleAPIPagination(res, page);

        const data = this.handleResponse(res);
        page.setRows(data);

        return page;
      })
      .catch(this.handleErrorObservable);
  }

  private _handleAPIPagination(response, page) {

    const payload = response.json();
    if (!payload.hasOwnProperty('hasNext')) { return; }

    page.apiPagination = true;
    page.hasNext = payload.hasNext;
  }
}
