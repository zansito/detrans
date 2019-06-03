import { Http, RequestOptions, Response, Headers, ResponseContentType, RequestMethod, ResponseType } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../../../login/domain/login.service';
import { RestService } from '../../../shared/services/rest.service';

@Injectable()
export class CredentialService extends RestService {

  headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.loginService.getToken()
  });

  private api = 'http://localhost:8080/credential'

  constructor(
    private injector: Injector,
    private loginService: LoginService) {
    super(injector);
  }

  getCredential(id) {
    return this.http
      .get(`${this.api}/${id}`, { headers: this.headers })
      .map((response: Response) => response.json())
      .catch(this.handleErrorObservable);
  }

  generatePdf(credential) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.api, credential, options)
      .map(res => console.log(res))
      .catch(this.handleErrorObservable);
  }

  download(id) {
    const file = `${id}.pdf`
    return this.http.get(`${this.api}/download/${file}`, { headers: this.headers })
      .map((response: Response) => response)
      .catch(this.handleErrorObservable);
  }

  print(id) {
    const url = `${this.api}/download/${id}.pdf`;
    return this.http.get(url, {
      responseType: ResponseContentType.Blob
    }).map((response: Response) => response)
      .catch(this.handleErrorObservable);
  }

  delete(id) {
    const url = `${this.api}/${id}.pdf`;
    return this.http.delete(url, { headers: this.headers })
      .map(res => res.status)
      .catch(this.handleErrorObservable);
  }

  getHistoryDetail(id) {
    return this.http
      .get(`${this.api}/detail/${id}`, { headers: this.headers })
      .map(this.handleResponse)
      .catch(this.handleErrorObservable)
  }
}
