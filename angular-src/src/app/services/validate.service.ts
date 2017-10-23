import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateUserInfo(user) {
      if (user.name == undefined  ||
          user.email == undefined ||
          user.username == undefined ||
          user.password == undefined) {
        return false;
      }

      return true;
  }

}
