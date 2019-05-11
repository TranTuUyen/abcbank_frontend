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
  MatNativeDateModule
} from '@angular/material';
import {ToastrModule} from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../authentication/login/login.component'
import { AccountComponent } from '../accounts/account_config/account.component'

import { LoginService } from '../authentication/login/login.service'
import { AccountService } from '../services/account.service'
import { AuthGuard } from '../_guards/guards';
import { JwtInterceptor } from '../base/services/jwt_auth/jwt.interceptor';
import { AccountCreateComponent } from '../accounts/account_create/account.create.component';
import { MonthPickerComponent } from '../accounts/moth__picker/month.picker.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    AccountCreateComponent,
    MonthPickerComponent
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
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    ToastrModule.forRoot()

  ],
  providers: [
    HttpModule,
    HttpClientModule,
    MatDatepickerModule, 
    JWTService,
    LoginService,
    AuthGuard,
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AccountCreateComponent]
})
export class AppModule { }
