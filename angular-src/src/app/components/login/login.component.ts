import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: String;
  private password: String;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ){}

  ngOnInit() {
  }

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    // http post
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['profile']);
        this.flashMessage.show("Cool man, you're login!!", {
          cssClass: 'alert-success',
          timeout: 3000,
        })
      } else {
        this.flashMessage.show("Failed to login. Forget password?", {
          cssClass: 'alert-danger',
          timeout: 3000,
        })
      }
    })
  }
}
