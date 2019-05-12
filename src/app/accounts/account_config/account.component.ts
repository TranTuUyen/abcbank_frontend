import { Component, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTable, MatTableDataSource, Sort, MatDatepickerInputEvent } from '@angular/material';
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
	isAdvanceSearch: boolean = false;
	displayedColumns: string[] = ['account_number', 'firstname', 'lastname', 'balance', 'email', 'age', 'gender', 'employer', 'address', 'city', 'state'];

	// Filter
	allFilterValue = "";
	advanceFilterValues: any = {
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

	initDate: Date; 

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
		};
		this.initDate = new Date();
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
							this.advanceFilterValues.account_number = accountNumber;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.balanceFilter.valueChanges
					.subscribe(
						balance => {
							this.advanceFilterValues.balance = balance;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.firstNameFilter.valueChanges
					.subscribe(
						firstName => {
							this.advanceFilterValues.firstname = firstName;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.lastNameFilter.valueChanges
					.subscribe(
						lastname => {
							this.advanceFilterValues.lastname = lastname;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.ageFilter.valueChanges
					.subscribe(
						age => {
							this.advanceFilterValues.age = age;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
							let birthDate = moment().subtract(age, 'years').subtract(0, 'months').subtract(0, 'days').format('DD-MM-YYYY');
							this.initDate = new Date(birthDate);
						}
					)
				this.genderFilter.valueChanges
					.subscribe(
						gender => {
							this.advanceFilterValues.gender = gender;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.addressFilter.valueChanges
					.subscribe(
						address => {
							this.advanceFilterValues.address = address;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.cityFilter.valueChanges
					.subscribe(
						city => {
							this.advanceFilterValues.city = city;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.stateFilter.valueChanges
					.subscribe(
						state => {
							this.advanceFilterValues.state = state;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.employerFilter.valueChanges
					.subscribe(
						employer => {
							this.advanceFilterValues.employer = employer;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
						}
					)
				this.emailFilter.valueChanges
					.subscribe(
						email => {
							this.advanceFilterValues.email = email;
							this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
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

	onToggleAdvanceSearch() {
		this.isAdvanceSearch = !this.isAdvanceSearch;
		if (this.isAdvanceSearch) {
			this.dataSource.filterPredicate = this.advanceFilter();
		}
		else {
			this.dataSource.filterPredicate = this.allFilter();
		}
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

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		let date = event.value;
		let timeDiff = Math.abs(Date.now() - date.getTime());
		let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
		this.advanceFilterValues.age = age;
		this.dataSource.filter = JSON.stringify(this.advanceFilterValues);
	}

	showSuccess(message: string) {
		this.toastr.success(message);
	}

	showError(message: string) {
		this.toastr.error(message)
	}
}