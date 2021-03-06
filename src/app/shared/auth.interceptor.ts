import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as formauth from './../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private store: Store<fromApp.AppState>) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return this.store.select('auth')
     .take(1)
     .switchMap((authState: formauth.State) => {
      const copiedReq = req.clone({params: req.params.set('auth', authState.token )});
      return next.handle(copiedReq);
  });
}

}
