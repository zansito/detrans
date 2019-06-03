import { Injectable, Injector } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Headers } from '@angular/http';
import { LoginService } from '../../login/domain/login.service';

@Injectable()
export class DashboardService extends RestService {
  private headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.loginService.getToken()
  });

  private api = "http://localhost:8080/dashboard";

  constructor(private injector: Injector, private loginService: LoginService) {
    super(injector);
  }

  getNeighborhood() {
    return this.http
      .get(`${this.api}/neighboorhood`, { headers: this.headers })
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getCredentialType() {
    return this.http
      .get(`${this.api}/credentialtype`, { headers: this.headers })
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getByMonthCurrentYear() {
    return this.http
      .get(`${this.api}/monthyear`, { headers: this.headers })
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  fillBarChartData() {
    return this.http
      .get(`${this.api}/barchart`, { headers: this.headers })
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }
}