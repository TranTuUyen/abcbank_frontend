import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { RequestOptionsArgs, URLSearchParams, Headers } from '@angular/http'

import { JWTService } from './jwt.service'

@Injectable()
export class AuthHttpService {

	constructor(private http: HttpClient) {
	}

	// public get(endPoint: string, queryData?: any): Observable<any> {
	// 	let queryParams
	// 	let optionArgs: RequestOptionsArgs = {}

	// 	if (queryData) {
	// 		queryParams = new URLSearchParams()
	// 		for (let key in queryData) {
	// 			queryParams.set(key, queryData[key])
	// 		}
	// 		optionArgs.search = queryParams
	// 	}
	// 	let myHeader = new Headers();
	// 	myHeader.append('Content-type', 'application/json');
	// 	optionArgs.headers = myHeader;
	// 	return this.http.get(endPoint, optionArgs)
	// }

	// public post(endPoint: string, data: any): Observable<any> {
	// 	return this.http.post(endPoint, data)
	// }

	// public put(endPoint: string, data: any): Observable<any> {
	// 	return this.http.put(endPoint, data)
	// }

	// public delete(endPoint: string, queryData?: any): Observable<any> {
	// 	let queryParams
	// 	let optionArgs: RequestOptionsArgs = {}

	// 	if (queryData) {
	// 		queryParams = new URLSearchParams()
	// 		for (let key in queryData) {
	// 			queryParams.set(key, queryData[key])
	// 		}
	// 		optionArgs.search = queryParams
	// 	}
	// 	let myHeader = new HttpHeaders();
	// 	myHeader.append('Content-type', 'application/json');
	// 	optionArgs.headers = myHeader;
	// 	return this.http.delete(endPoint, optionArgs)
	// }
}
