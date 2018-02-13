import * as AuthActions from './auth.actions';
export interface State {
  token: string;
  authenticated: boolean;
  error: string;

}

const initialState: State = {
  token: null,
  authenticated: false,
  error: null
};


export function authReducer(state = initialState, action: AuthActions
  .AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case AuthActions.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case AuthActions.RESET_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
