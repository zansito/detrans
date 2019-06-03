import { Injectable, Injector } from '@angular/core';
import { RestService } from './rest.service';
import { LoginService } from '../../login/domain/login.service';
import { Headers } from '@angular/http';

@Injectable()
export class UzerService extends RestService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.loginService.getToken()
  });

  api = 'http://localhost:8080/users';

  constructor(
    private injector: Injector,
    private loginService: LoginService
  ) { super(injector) }

  getUserData(username) {
    return this.http.get(`${this.api}/${username}`,
      { headers: this.headers }).map(this.handleResponse)
      .catch(this.handleErrorPromise)
  }

}
