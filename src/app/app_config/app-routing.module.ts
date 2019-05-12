import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component'
import { AccountComponent } from '../main_app/accounts/account_config/account.component'
import { AuthGuard } from '../base/_guards/guards';
import { PageComponent } from '../main_app/mainapp_CONFIG/mainapp.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'application', component: PageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccountComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
