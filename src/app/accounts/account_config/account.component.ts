import { Component } from '@angular/core'
import { FormControl, Validators } from "@angular/forms";
import { AccountService } from './account.service';
import { Account } from 'src/app/model/account.model';

@Component({
	selector: 'account',
	templateUrl: './account.html',
	styleUrls: [
		'./account.scss',]
})

export class AccountComponent {
	constructor(private accountService: AccountService) {}

	ngOnInit() {
		this.accountService.getAccounts()
		.subscribe((res: Account[]) => {
			console.log(res)
		  },
		  err => {
			console.log("Error occured");
		  }
		);
	}
}