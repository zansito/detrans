import { Injectable, Injector } from '@angular/core';

import { RequestOptions, Headers } from '@angular/http';
import { RestService } from 'app/shared/services/rest.service';

@Injectable()
export class ResetService extends RestService {
  constructor(private injector: Injector) {
    super(injector);
  }

  findByTokenAndChangePassword(password: string, token: string) {
    return this.http
      .get(
      `http://localhost:8080/reset/${token}/${password}`,
        { headers: new Headers({ 'Content-Type': 'application/json' }) }
      )
      .map(res => {
        return res;
      })
      .catch(this.handleErrorObservable);
  }
}