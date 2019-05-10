import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { JWTService } from './jwt.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public static currentTeamId : any;
  constructor(public jvtservice: JWTService) {
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestOption:any = {};
     
    if(this.jvtservice.getAccessToken()) {
      requestOption.setHeaders = {
        Authorization: `Bearer ${this.jvtservice.getAccessToken()}`
      }
    } 

    request = request.clone(requestOption); 
    console.log(request)
    return next.handle(request)
  }
}