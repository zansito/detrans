import { Injectable, Injector } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../../../shared/services/rest.service';
import { LoginService } from '../../../login/domain/login.service';
import { Document } from '../domain/document.model';

@Injectable()
export class AccreditedUploadFileService extends RestService {

  private storageApi = 'http://localhost:8080/getallfiles'
  private documentApi = 'http://localhost:8080/document';
  private delete = 'http://localhost:8080/deletefiles';

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.loginService.getToken()
  });

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient,
    private injector: Injector
  ) { super(injector) }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    const req = new HttpRequest('POST', '/upload-file', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(req)
  }

  getDocumentInfo(id: number) {
    return this.http.get(`${this.documentApi}/${id}`, { headers: this.headers })
      .map(this.handleResponse)
      .catch(this.handleErrorObservable)
  }


  saveInfo(document) {
    const options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.documentApi, document, options)
      .map(res => console.log(res))
      .catch(this.handleErrorPromise);
  }

  deleteFile(id) {
    return this.http.delete(`${this.documentApi}/delete/${id}`, { headers: this.headers })
      .map(res => res.status)
      .catch(this.handleErrorPromise)
  }

  deleteFileFromRepository(fileName: string) {
    return this.http.delete(`${this.delete}/${fileName}`, { headers: this.headers })
      .map(res => res.status)
      .catch(this.handleErrorPromise)
  }
}
