import { Injectable } from '@angular/core';

import { Http, Headers, URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/map';

import { apis } from '../config/apis';

@Injectable()
export class IntentService {

  constructor(
    private http: Http,
  ) { }

  addIntent(intent) {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = this.buildHeaders();

    return this.http.post(apis.intents.uri, {
        user: user.id,
        name: intent.name,
        sentences: []
      })
      .map(res => res.json());
  }

  deleteIntent(intetnId, intent) {

  }

  getIntents() {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = this.buildHeaders();
    let params = this.buildParams();

    params.set('userid', user.id);

    return this.http.get(apis.intents.uri, {
        search: params,
        headers: headers
      })
      .map(res => res.json());
  }

  updateIntent(intent) {
    const user = JSON.parse(localStorage.getItem('user'));
    const headers = this.buildHeaders();

    return this.http.put(apis.intents.uri, {
          id: intent.id,
          name: intent.name,
          sentences: intent.sentences
      }, { headers: headers })
      .map(res => res.json());
  }

  private buildHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return headers
  }

  private buildParams() {
    let params: URLSearchParams = new URLSearchParams();

    return params;
  }

}
