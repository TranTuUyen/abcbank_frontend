import {Injectable,} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {AccountAPIs} from '../base/apis/account.api'
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
    constructor(private http: HttpClient) {}

    public getAccounts(): Observable<any> {
        return this.http.get(AccountAPIs.ACCOUNT_BASE, {params: {}})
    }
    
    
    public createAccount(account: any): Observable<any> {
        return this.http.post(AccountAPIs.ACCOUNT_BASE,account )
    }

    public removeAccount(accountId): Observable<any> {
        return this.http.delete(AccountAPIs.ACCOUNT_BASE + `/${accountId}`)
    }

    public updateAccount(account): Observable<any> {
        let cloneAccount = Object.assign({}, account)
        let accountId = account._id.$oid;
        delete cloneAccount._id;
        return this.http.put(AccountAPIs.ACCOUNT_BASE + `/${accountId}`, cloneAccount)
    }

    public checkEmail(email):  Observable<any> {
        let data = {
            email: email
        }
        return this.http.post(AccountAPIs.ACCOUNT_CHECK_EMAIL, data)
    }

    public checkAccountNumber(account_number):  Observable<any> {
        let data = {
            account_number: account_number
        }
        return this.http.post(AccountAPIs.ACCOUNT_CHECK_ACCOUNT_NUMBER, data)
    }

}