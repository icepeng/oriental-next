import { Action } from '@ngrx/store';

import { User } from '../../user/models/user.model';
import { Decoded } from '../models/token.model';

export enum AuthActionTypes {
    Login = '[Auth] Login',
    LoginSuccess = '[Auth] Login Success',
    LoginFailure = '[Auth] Login Failure',
    Logout = '[Auth] Logout',
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;

    constructor() {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LoginSuccess;

    constructor(public payload: { token: string; decoded: Decoded<User> }) {}
}

export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LoginFailure;

    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login | LoginSuccess | LoginFailure | Logout;
