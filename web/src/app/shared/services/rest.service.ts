import { Injectable, Injector } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ProgressHttp } from 'angular-progress-http';

export abstract class RestService {

  protected http: Http;

  constructor(injector: Injector) {
    this.http = injector.get(Http);
  }

  protected handleResponse(res: Response) {
    const data: any = res.json();
    return data.content || data.items || data;
  }

  protected handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  protected handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
}