import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { JWTAuthVariable } from '../../variables/jwt_auth/auth.variables'


@Injectable()
export class JWTService {
    constructor(private http: HttpClient) {
    }

    getAccessToken(): string {
        return localStorage.getItem(JWTAuthVariable.ACCESS_TOKEN)
    }

    addTokens(accessToken: string) {
        localStorage.setItem(JWTAuthVariable.ACCESS_TOKEN, accessToken)
    }

    removeToken() {
        localStorage.removeItem(JWTAuthVariable.ACCESS_TOKEN);
    }

    saveUserInfo(userInfo: any) {
        localStorage.setItem('USER_INFO', JSON.stringify(userInfo))
    }

    removeUserInfo() {
        localStorage.removeItem('USER_INFO');
    }

    getUserInfo(): any {
        return localStorage.getItem('USER_INFO')
    }
}