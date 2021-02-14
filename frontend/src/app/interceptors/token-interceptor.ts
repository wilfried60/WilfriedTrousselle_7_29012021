import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const newRequest = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("token"))
    });
    return next.handle(newRequest);
  }
}
