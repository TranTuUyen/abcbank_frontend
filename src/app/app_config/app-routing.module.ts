import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../authentication/login/login.component'
import { AccountComponent } from '../accounts/account_config/account.component'
import { AuthGuard } from '../_guards/guards';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'application', component: AccountComponent, canActivate: [AuthGuard] },
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
