import { Component, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTable, MatTableDataSource, Sort } from '@angular/material';
import { AccountService } from './../../services/account.service';
import { Account } from 'src/app/model/account.model';
import { AccountCreateComponent } from '../account_create/account.create.component';
import { JWTService } from 'src/app/base/services/jwt_auth/jwt.service';
import { CommonVariables } from '../../base/variables/common/common.variables'
import { FormControl } from '@angular/forms';

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

	// Filter
	allFilterValue = "";
	filterValues: any = {
		_id: '',
		account_number: '',
		balance: '',
		firstname: '',
		lastname: '',
		age: '',
		gender: '',
		address: '',
		city: '',
		state: '',
		employer: '',
		email: '',
		password: '',
		role: '',
	}

	allFieldFilter = new FormControl('')

	accountNumberFilter = new FormControl('');
	balanceFilter = new FormControl('');
	firstNameFilter = new FormControl('');
	lastNameFilter = new FormControl('');
	ageFilter = new FormControl('');
	genderFilter = new FormControl('');
	addressFilter = new FormControl('');
	cityFilter = new FormControl('');
	stateFilter = new FormControl('');
	employerFilter = new FormControl('');
	emailFilter = new FormControl('');

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
				this.dataSource.filterPredicate = this.allFilter();
				this.dataSource.paginator = this.paginator;
				this.accountList = res;

				// Setup filter event
				this.allFieldFilter.valueChanges
				.subscribe(
					text => {
						this.allFilterValue = text;
						this.dataSource.filter = this.allFilterValue;
					}
				)
				this.accountNumberFilter.valueChanges
					.subscribe(
						accountNumber => {
							this.filterValues.account_number = accountNumber;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.balanceFilter.valueChanges
					.subscribe(
						balance => {
							this.filterValues.balance = balance;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.firstNameFilter.valueChanges
					.subscribe(
						firstName => {
							this.filterValues.firstname = firstName;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.lastNameFilter.valueChanges
					.subscribe(
						lastname => {
							this.filterValues.lastname = lastname;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.ageFilter.valueChanges
					.subscribe(
						age => {
							this.filterValues.age = age;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.genderFilter.valueChanges
					.subscribe(
						gender => {
							this.filterValues.gender = gender;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.addressFilter.valueChanges
					.subscribe(
						address => {
							this.filterValues.address = address;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.cityFilter.valueChanges
					.subscribe(
						city => {
							this.filterValues.city = city;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.stateFilter.valueChanges
					.subscribe(
						state => {
							this.filterValues.state = state;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.employerFilter.valueChanges
					.subscribe(
						employer => {
							this.filterValues.employer = employer;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)
				this.emailFilter.valueChanges
					.subscribe(
						email => {
							this.filterValues.email = email;
							this.dataSource.filter = JSON.stringify(this.filterValues);
						}
					)

			},
				err => {
					console.log(err)
				}
			);
	}

	allFilter(): (data: Account, filter: string) => boolean {
		let filterFunction = function (data: Account, filter: string): boolean {
			let searchTerms = filter;
			return data.account_number.toString().indexOf(searchTerms) !== -1
				|| data.balance.toString().indexOf(searchTerms) !== -1
				|| data.firstname.toLowerCase().indexOf(searchTerms) !== -1
				|| data.lastname.toString().toLowerCase().indexOf(searchTerms) !== -1
				|| (data.age && data.age.toString().indexOf(searchTerms) !== -1)
				|| (data.gender && data.gender.toLowerCase().indexOf(searchTerms) !== -1)
				|| (data.address && data.address.toLowerCase().indexOf(searchTerms) !== -1)
				|| (data.city && data.city.toLowerCase().indexOf(searchTerms) !== -1)
				|| (data.state && data.address.toLowerCase().indexOf(searchTerms) !== -1)
				|| (data.employer && data.employer.toLowerCase().indexOf(searchTerms) !== -1)
				|| data.email.toLowerCase().indexOf(searchTerms) !== -1;
		}
		return filterFunction;
	}

	advanceFilter(): (data: Account, filter: string) => boolean {
		let filterFunction = function (data: Account, filter: string): boolean {
			let searchTerms = JSON.parse(filter);
			return data.account_number.toString().indexOf(searchTerms.account_number) !== -1
				&& data.balance.toString().indexOf(searchTerms.balance) !== -1
				&& data.firstname.toLowerCase().indexOf(searchTerms.firstname.toLowerCase()) !== -1
				&& data.lastname.toString().toLowerCase().indexOf(searchTerms.lastname.toLowerCase()) !== -1
				&& (data.age && data.age.toString().indexOf(searchTerms.age) !== -1)
				&& (data.gender && data.gender.toLowerCase().indexOf(searchTerms.gender.toLowerCase()) !== -1)
				&& (data.address && data.address.toLowerCase().indexOf(searchTerms.address.toLowerCase()) !== -1)
				&& (data.city && data.city.toLowerCase().indexOf(searchTerms.city.toLowerCase()) !== -1)
				&& (data.state && data.address.toLowerCase().indexOf(searchTerms.state.toLowerCase()) !== -1)
				&& (data.employer && data.employer.toLowerCase().indexOf(searchTerms.employer.toLowerCase()) !== -1)
				&& data.email.toLowerCase().indexOf(searchTerms.email) !== -1;
		}
		return filterFunction;
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