import { Component } from '@angular/core'
import { FormControl, Validators } from "@angular/forms";

import { LoginService } from './login.service'
import { Router } from '@angular/router'
import { CommonVariables } from '../../base/variables/common/common.variables'
import { JWTService } from '../../base/services/jwt_auth/jwt.service'

@Component({
	selector: 'login',
	templateUrl: './login.html',
	styleUrls: [
		'./login.scss',]
})

export class LoginComponent {
	hasError: boolean = false
	errorMsg: string = ''
	userInfo = {
		email: '',
		password: ''
	}

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	passwordFormControl = new FormControl('', [
		Validators.required,
	]);

	constructor(private loginService: LoginService,
		private jwtService: JWTService,
		private router: Router) { }


	onEmailChange() {

	}
	public onLogin() {
		this.hasError = false
		if (this.checkLogin()) {
			this.loginService
				.login(this.userInfo)
				.subscribe(
					response => {
						this.jwtService.addTokens(response.data.token)
						this.jwtService.saveUserInfo(response.data)
						this.router.navigate(['/application'])
					},
					error => {
						this.errorMsg = CommonVariables.LOGIN_ERROR
						if (error.status === CommonVariables.STATUS_CODE_400) {
							let message: string = error.error.message;
							switch (message) {
								case CommonVariables.ACCOUNT_NOT_EXIST:
									this.errorMsg = CommonVariables.ACCOUNT_NOT_EXIST
									break
								case CommonVariables.PASSWORD_WRONG:
									this.errorMsg = CommonVariables.PASSWORD_WRONG
									break
								default:
									this.errorMsg = CommonVariables.LOGIN_ERROR
							}
						}
						this.hasError = true
					}
				)
		}
	}

	checkLogin() {
		if(!this.userInfo.email) {
			return false;
		}

		if(!this.userInfo.password) {
			return false;
		}
		
		if (!this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required')
			&& this.userInfo.email && this.userInfo.password) {
			return true;
		}

		return false
	}

}