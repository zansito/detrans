import { Injectable, Injector } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ForgotService extends RestService {
  constructor(private injector: Injector) {
    super(injector);
  }

  findByMail(email: string) {
    return this.http
      .get(`http://localhost:8080/forgot-me/${email}`)
      .map(res => {
        return res
      })
      .catch(this.handleErrorObservable);
  }
}
