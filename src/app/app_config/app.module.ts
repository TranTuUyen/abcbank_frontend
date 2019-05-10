import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { JWTService } from "../base/services/jwt_auth/jwt.service"

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatCheckboxModule, MatTableModule, MatSortModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../authentication/login/login.component'
import { AccountComponent } from '../accounts/account_config/account.component'

import { LoginService } from '../authentication/login/login.service'
import {AccountService} from '../services/account.service'
import { AuthGuard } from '../_guards/guards';
import { JwtInterceptor } from '../base/services/jwt_auth/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: function tokenGetter() {
    //       return localStorage.getItem('access_token');
    //     },
    //     whitelistedDomains: ['localhost:4200'],
    //     blacklistedRoutes: ['http://localhost:4200/login']
    //   }
    // })

  ],
  providers: [
    HttpModule,
    HttpClientModule,
    JWTService,
    LoginService,
    AuthGuard,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
