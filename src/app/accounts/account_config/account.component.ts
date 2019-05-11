import { Component, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTable, MatTableDataSource, Sort } from '@angular/material';
import { AccountService } from './../../services/account.service';
import { Account } from 'src/app/model/account.model';
import { AccountCreateComponent } from '../account_create/account.create.component';
import { JWTService } from 'src/app/base/services/jwt_auth/jwt.service';
import { CommonVariables } from '../../base/variables/common/common.variables'

@Component({
	selector: 'account',
	templateUrl: './account.html',
	styleUrls: [
		'./account.scss',]
})

export class AccountComponent {
	loggedAccount: Account;
	isAdmin: boolean = false;
	selectedAccount: Account;
	accountList: Account[] = [];
	dataSource: MatTableDataSource<Account>;
	displayedColumns: string[] = ['account_number', 'firstname', 'lastname', 'balance', 'email', 'age', 'gender', 'employer', 'address', 'city', 'state'];

	// Paging

	@ViewChild(MatPaginator) paginator: MatPaginator;
	constructor(
		private accountService: AccountService,
		public jvtservice: JWTService,
		public dialog: MatDialog,
		private toastr: ToastrService
	) {

		this.loggedAccount = this.jvtservice.getUserInfo()
		if (this.loggedAccount.role == CommonVariables.ADMIN) {
			this.isAdmin = true;
			this.displayedColumns.push("remove");
		}
	}

	ngOnInit() {
		this.accountService.getAccounts()
			.subscribe((res: Account[]) => {
				this.dataSource = new MatTableDataSource(res);
				this.dataSource.paginator = this.paginator;
				this.accountList = res
			},
				err => {
					console.log(err)
				}
			);
	}

	onViewAccount(row) {
		this.selectedAccount = row;
		const dialogRef = this.dialog.open(AccountCreateComponent, {
			width: '650px',
			data: row
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const data = this.dataSource.data;
				var index = data.indexOf(this.selectedAccount);

				if (index !== -1) {
					data[index] = result;
					this.selectedAccount = result;
					this.dataSource.data = data;
				}
			}
		});
	}

	onOpenCreateForm() {
		const dialogRef = this.dialog.open(AccountCreateComponent, {
			width: '650px',
			data: null
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const data = this.dataSource.data;
				data.unshift(result);
				this.dataSource.data = data;
			}
		});
	}

	onRemoveAccount(row, index: number) {
		let accountId = row._id.$oid;
		event.stopPropagation();
		this.accountService.removeAccount(accountId)
			.subscribe(res => {
				const data = this.dataSource.data;
				data.splice(index, 1);
				this.dataSource.data = data;
				this.showSuccess("Remove successfull")
			},
				error => {
					this.showError("Remove failed")
				})
	}

	showSuccess(message: string) {
		this.toastr.success(message);
	}

	showError(message: string) {
		this.toastr.error(message)
	}
}