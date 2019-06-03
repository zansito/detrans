import { Http, RequestOptions, Response, Headers, ResponseContentType } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { RestService } from '../../../shared/services/rest.service';
import { LoginService } from '../../../login/domain/login.service';

@Injectable()
export class AccreditedService extends RestService {
  private api = 'http://localhost:8080/accredited'

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.loginService.getToken()
  });

  constructor(injector: Injector,
    private loginService: LoginService) {
    super(injector);
  }

  getAccredited(id) {
    return this.http
      .get(`${this.api}/${id}`, { headers: this.headers })
      .map(this.handleResponse)
  }

  save(accredited) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.api, accredited, options)
      .map(this.handleResponse)
      .catch(this.handleErrorObservable);
  }

  getHistoryDetail(id) {
    return this.http
      .get(`${this.api}/detail/${id}`, { headers: this.headers })
      .map(this.handleResponse)
  }

}
