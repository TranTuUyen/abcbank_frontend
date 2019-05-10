import {Injectable,} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {AccountAPIs} from '../../base/apis/account.api'
import { Observable } from 'rxjs';

@Injectable()
export class AccountService {
    constructor(private http: HttpClient) {}

    public getAccounts(): Observable<any> {
        return this.http.get(AccountAPIs.ACCOUNT_BASE, {params: {}})
    }

}