import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const newRequest = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + this.cookieService.get('token'))
    });
    return next.handle(newRequest);
  }
}