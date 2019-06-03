import { Injectable, Injector } from '@angular/core';
import { Http, RequestOptions, Response, Headers, ResponseContentType } from '@angular/http';

import 'rxjs/Rx';

import { RestService } from 'app/shared/services/rest.service';
import { User } from './user.model';
import { LoginService } from 'app/login/domain/login.service';

@Injectable()
export class UserService extends RestService {
  private headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.loginService.getToken()
  });

  private api = 'http://localhost:8080/users';

  constructor(injector: Injector, private loginService: LoginService) {
    super(injector);
  }

  createUser(user) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: this.headers });

    return this.http
      .post(this.api, user, options)
      .map(res => {
        console.log('done')
      })
      .catch(this.handleErrorObservable);
  }

  getUserById(id: number) {
    return this.http
      .get(`http://localhost:8080/get-user/${id}`, { headers: this.headers })
      .map((response: Response) => response.json());
  }

  findByMail(email: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: this.headers });

    return this.http
      .post('http://localhost:8080/forgot-me/gelson@mail.com', {}, options)
      .map(res => {
        return res;
      })
      .catch(this.handleErrorObservable);
  }
}