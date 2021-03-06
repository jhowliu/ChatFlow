// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConsoleComponent } from './components/console/console.component';
import { IntentComponent } from './components/intent/intent.component';
import { EntityComponent } from './components/entity/entity.component';

// Services
import { AuthService } from './services/auth.service';
import { IntentService } from './services/intent.service';
import { ValidateService } from './services/validate.service';
import { EntityService } from './services/entity.service';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'console', component: ConsoleComponent, canActivate: [AuthGuard],
    children: [
      { path: 'intent/:id', component: IntentComponent }
    ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ConsoleComponent,
    IntentComponent,
    EntityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
  ],
  providers: [
    ValidateService,
    AuthService,
    IntentService,
    EntityService,
    AuthGuard,
    FormBuilder,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
