import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { apis } from '../config/apis'

@Injectable()
export class EntityService {

  constructor(
    private http: Http,
  ) { }

  // READ
  getEntitiesByIntentId(intendId) {
    let headers = this.buildHeaders();
    let params = this.buildParams();

    params.set('intentId', intentId)

    return this.http.get(apis.entities.api, {
        search: params,
        headers: headers,
      })
      .map(res => res.json());
  }
  // POST
  addEntity(entity) {
    let headers = this.buildHeaders();

    return this.http.post(apis.entities.uri, {
        name: entity.name,
        sentences: entity.sentences,
        intentId: entity.intentId,
      }, { headers: headers })
      .map(res => res.json());

  }
  // DELETE
  deleteEntity(id) {
    let headers = this.buildHeaders();

    return this.http.delete(apis.entities.uri, {
        body: { id: id },
        headers: headers,
      })
      .map(res => res.json());
  }
  // PUT
  updateEntity(entity) {
    let headers = this.buildHeaders();

    return this.http.put(apis.entities.uri, {
        id: entity.id,
        name: entity.name,
        sentences: entity.sentences,
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
