import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor (public payload: {email: string, password: string}) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;
  constructor (public payload: {email: string, password: string}) {}
}


export class SignUp implements Action {
  readonly type = SIGNUP;
}

export class SignIn implements Action {
  readonly type = SIGNIN;
}


export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export class SetError implements Action {
  readonly type = SET_ERROR;
  constructor (public payload: string) {}
}

export class ResetError implements Action {
  readonly type = RESET_ERROR;
}


export type AuthActions =
  SignUp |
  SignIn |
  LogOut |
  SetToken |
  TrySignup |
  TrySignin |
  SetError |
  ResetError
  ;
