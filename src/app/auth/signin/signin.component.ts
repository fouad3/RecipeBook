import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  error: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }
  ngOnInit() {
    this.error = this.store.select('auth');
  }

  signin(signinForm: NgForm) {
    const email = signinForm.value.email;
    const password = signinForm.value.password;
    this.store.dispatch(new AuthActions.TrySignin({email: email, password: password}));
  }

  ngOnDestroy() {
    this.store.dispatch(new AuthActions.ResetError());
  }
}
