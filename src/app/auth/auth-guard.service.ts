import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  ActivatedRoute,
  CanLoad
} from '@angular/router';
import * as fromApp from '../store/app.reducers';
import * as formauth from './store/auth.reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private route: ActivatedRoute) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
     .map((authState: formauth.State) => {
      if (authState.authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  canLoad(route: Route ) {
    return this.store.select('auth')
    .take(1)
    .map((authState: formauth.State) => {
      if (authState.authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

}
