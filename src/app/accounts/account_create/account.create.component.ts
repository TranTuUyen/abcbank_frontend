import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { JWTService } from 'src/app/base/services/jwt_auth/jwt.service';
import * as moment from 'moment';
import { CommonVariables } from 'src/app/base/variables';
import { Account } from 'src/app/model/account.model';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'account-create',
	templateUrl: './account.create.html',
	styleUrls: [
		'./account.create.scss',]
})


export class AccountCreateComponent implements OnInit {
	title: string;
	isUpdate: boolean;
	loggedAccount: Account;
	isAdmin: boolean;
	newAccount: any = {};
	dobformctrl: FormControl;
	initDate: Date;
	emailExisted: boolean;
	accountNumberExisted: boolean;
	oldAccount: Account;
	minDate: Date;
	maxDate: Date;

	accountNumberFormControl = new FormControl('',[
		Validators.required,
	])

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	ageControl = new FormControl("", [Validators.max(150), Validators.min(0)])

	passwordFormControl = new FormControl('',[
		Validators.required,
	])

	balanceFormControl = new FormControl("", [
		Validators.min(0)
	])

	constructor(private accountService: AccountService,
		public jvtservice: JWTService,
		private toastr: ToastrService,
		public dialogRef: MatDialogRef<AccountCreateComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Account) {
		if (!data) {
			this.title = "New account"
			this.isUpdate = false;
			this.newAccount = new Account();
		}
		else {
			this.title = "Update account";
			this.isUpdate = true;
			this.newAccount = Object.assign({}, data);
		}

		this.maxDate = new Date();
		this.minDate = new Date(moment().subtract(150, 'years').subtract(0, 'months').subtract(0, 'days').format('DD-MM-YYYY'))
		this.loggedAccount = this.jvtservice.getUserInfo();
		if (this.loggedAccount.role == CommonVariables.ADMIN) {
			this.isAdmin = true;
		}
		else {
			this.isAdmin = false;
		}
	}

	ngOnInit() {
		if (this.newAccount.age && this.newAccount.age >= 0) {
			let birthDate = moment().subtract(this.newAccount.age, 'years').subtract(0, 'months').subtract(0, 'days').format('DD-MM-YYYY');
			this.initDate = new Date(birthDate);
		}
	}


	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		let date = event.value;
		let timeDiff = Math.abs(Date.now() - date.getTime());
		let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
		this.newAccount.age = age;
	}

	onEmailChanging() {
		// this.emailExisted = '';
	}

	onEmailChange() {
		this.emailExisted = false
		if (!this.emailFormControl.hasError('required') && !this.emailFormControl.hasError('email') && (!this.data || (this.data.email != this.newAccount.email))) {
			this.accountService.checkEmail(this.newAccount.email)
				.subscribe(response => {
					console.log(response)
				},
					error => {
						if (error.status === CommonVariables.STATUS_CODE_409) {
							this.emailExisted = true
						}
					})
		}
	}

	onChangeAccountNumber() {
		this.accountNumberExisted = false
		if (!this.accountNumberFormControl.hasError('required') && (!this.data || (this.data.account_number != this.newAccount.account_number))) {
			this.accountService.checkAccountNumber(this.newAccount.account_number)
				.subscribe(response => {
				},
					error => {
						if (error.status === CommonVariables.STATUS_CODE_409) {
							this.accountNumberExisted = true
						}
					})
		}
	}

	onChangeAge() {

		if (this.newAccount.age <= 150 && this.newAccount.age > 0) {
			let birthDate = moment().subtract(this.newAccount.age, 'years').subtract(0, 'months').subtract(0, 'days').format('DD-MM-YYYY');
			this.initDate = new Date(birthDate);
		}
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onSubmit() {
		if (JSON.stringify(this.newAccount) === JSON.stringify(this.data)) {
			this.dialogRef.close();
		}
		else if (!this.ageControl.hasError("min")
			&& !this.ageControl.hasError("max")
			&& !this.emailFormControl.hasError('email')
			&& !this.emailFormControl.hasError('required')
			&& !this.passwordFormControl.hasError('required')
			&& !this.accountNumberFormControl.hasError('required')
			&& !this.balanceFormControl.hasError('min')
			&& !this.emailExisted
			&& !this.accountNumberExisted
		) {
			if (this.isUpdate) {
				this.accountService.updateAccount(this.newAccount)
					.subscribe(response => {
						this.showSuccess("Update successful")
						this.dialogRef.close(this.newAccount);
					},
						err => {
							this.showError("Update failed")
							this.dialogRef.close();
						})
			}
			else {
				this.accountService.createAccount(this.newAccount)
					.subscribe(response => {
						this.newAccount._id = {$oid: response}
						this.showSuccess("Create account successful")
						this.dialogRef.close(this.newAccount);
					},
						err => {
							this.showError("Create account failed")
							this.dialogRef.close();
						})
			}
		}
	}

	showSuccess(message: string) {
		this.toastr.success(message);
	}

	showError(message: string) {
		this.toastr.error(message)
	}
}