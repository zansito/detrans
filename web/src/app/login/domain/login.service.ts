import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  private authUrl = 'http://localhost:8080/auth';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
  }

  login(user): Observable<boolean> {
    return this.http.post(this.authUrl,
        JSON.stringify({
          username: user.username,
          password: user.password
        }),{ headers: this.headers })
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token }))
          return true;
        } else {
          return false;
        }
      }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getToken(): String {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser && currentUser.token;
    return token ? token : '';
  }

  getCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser : '';
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    let token: String = this.getToken();
    return token && token.length > 0;
  }

}
