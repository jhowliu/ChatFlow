import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


import { tokenNotExpired } from 'angular2-jwt';
import { apis } from '../config/apis';


@Injectable()
export class AuthService {
  private authToken: any;
  private user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = this.buildHeaders();
    return this.http.post(apis.register.uri, user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = this.buildHeaders();
    return this.http.post(apis.authenticate.uri, user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = this.buildHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    console.log(headers);
    return this.http.get(apis.profile.uri, { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    // localStorage only store string
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
      const token = localStorage.getItem('token');
      this.authToken = token;
  }

  // login/logout service
  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  private buildHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return headers
  }
}
