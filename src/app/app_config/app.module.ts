import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { JWTService } from "../base/services/jwt_auth/jwt.service"

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatPaginatorModule
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../authentication/login/login.component'
import { AccountComponent } from '../main_app/accounts/account_config/account.component'

import { AuthService } from '../services/auth.service'
import { AccountService } from '../services/account.service'
import { AuthGuard } from '../base/_guards/guards';
import { JwtInterceptor } from '../base/services/jwt_auth/jwt.interceptor';
import { AccountCreateComponent } from '../main_app/accounts/account_create/account.create.component';
import { NavbarComponent } from '../main_app/navbar/navbar.component';
import { PageComponent } from '../main_app/mainapp_CONFIG/mainapp.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    NavbarComponent,
    LoginComponent,
    AccountComponent,
    AccountCreateComponent,
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
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AppRoutingModule,
    ToastrModule.forRoot()

  ],
  providers: [
    HttpModule,
    HttpClientModule,
    MatDatepickerModule,
    JWTService,
    AuthService,
    AuthGuard,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AccountCreateComponent]
})
export class AppModule { }
