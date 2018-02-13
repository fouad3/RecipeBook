import {Actions, Effect } from '@ngrx/effects';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/repeat';
import * as firebase from 'firebase';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as AuthActions from './auth.actions';
import {Router} from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {email: string, password: string} ) => {
      return fromPromise(firebase.auth()
        .createUserWithEmailAndPassword(authData.email, authData.password));
    })
    .catch((error) => {
      this.store.dispatch(new AuthActions.SetError(error.message));
      return Observable.empty();
     }
     )
    .repeat()
    .switchMap ( () => {
       return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNUP,
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
      return action.payload;
    })
    .switchMap((payload: {email: string, password: string}) => {
      return fromPromise(firebase.auth().
        signInWithEmailAndPassword(payload.email, payload.password));
    })
    .catch((error) => {
     this.store.dispatch(new AuthActions.SetError(error.message));
     return Observable.empty();
    }
    )
    .repeat()
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }
    )
    .mergeMap((token) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN,
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

    @Effect({ dispatch: false })
    redirect = this.actions$
      .ofType(AuthActions.LOGOUT)
        .do(() => {
        this.router.navigate(['/']);
      });

  constructor (private actions$: Actions, private router: Router,
              private store: Store<fromApp.AppState>) {
  }
}
