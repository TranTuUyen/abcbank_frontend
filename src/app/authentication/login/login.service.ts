import {Injectable,} from '@angular/core'
import {AccountAPIs} from '../../base/apis/account.api'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    public login(userInfo: any): Observable<any> {
        return this.http.post(AccountAPIs.ACCOUNT_LOGIN, userInfo)
    }

}