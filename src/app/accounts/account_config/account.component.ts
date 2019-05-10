import { Component } from '@angular/core'
import { FormControl, Validators } from "@angular/forms";
import { AccountService } from './../../services/account.service';
import { Account } from 'src/app/model/account.model';

@Component({
	selector: 'account',
	templateUrl: './account.html',
	styleUrls: [
		'./account.scss',]
})

export class AccountComponent {
	isOpenCreateFrom: boolean = false;
	accountList: Account[] = [];
	displayedColumns: string[] = ['account_number', 'firstname', 'lastname', 'balance', 'email', 'age', 'gender', 'employer', 'address', 'city', 'state'];

	constructor(private accountService: AccountService) { }

	ngOnInit() {
		this.accountService.getAccounts()
			.subscribe((res: Account[]) => {
				this.accountList = res
			},
				err => {
					console.log("Error occured");
				}
			);
	}

	onOpenCreateForm() {
		this.isOpenCreateFrom = true;
	}
}