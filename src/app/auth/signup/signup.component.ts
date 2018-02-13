import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import * as fromAuth from '../../auth/store/auth.reducers';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy  {
  error: Observable<fromAuth.State>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.error = this.store.select('auth');
  }

  signup(signupForm: NgForm) {
    const email = signupForm.value.email;
    const password = signupForm.value.password;
    this.store.dispatch(new AuthActions.TrySignup({email: email, password: password}));
  }

  ngOnDestroy() {
    this.store.dispatch(new AuthActions.ResetError());
  }
}
