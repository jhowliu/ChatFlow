import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface User {
  name: String,
  username: String,
  password: String,
  email: String
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  private name: String;
  private email: String;
  private username: String;
  private password: String;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    const user: User = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email
    }


    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log(user);
        this.flashMessage.show("You are now registered and can log in.", {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show("Failed to register.", {
          cssClass: 'alert-danger',
          timeout: 3000
        });
        this.router.navigate(['/register']);
      }
    })
  }
}
