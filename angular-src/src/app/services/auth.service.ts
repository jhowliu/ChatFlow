import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private registerURL = 'http://localhost:4567/users/register';
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = this.buildHeaders()
    return this.http.post(this.registerURL, user, { headers: headers })
      .map(res => res.json());
  }

  private buildHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return headers
  }
}
