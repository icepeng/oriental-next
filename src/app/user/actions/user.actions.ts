import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { User } from '../models/user.model';

export enum UserActionTypes {
    Load = '[User] Load',
    LoadSuccess = '[User] Load Success',
    LoadFailure = '[User] Load Failure',
    Select = '[User] Select',
}

export class Load implements Action {
    readonly type = UserActionTypes.Load;

    constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
    readonly type = UserActionTypes.LoadSuccess;

    constructor(public payload: User) {}
}

export class LoadFailure implements Action {
    readonly type = UserActionTypes.LoadFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export class Select implements Action {
    readonly type = UserActionTypes.Select;

    constructor(public payload: string) {}
}

export type UserActions = Load | LoadSuccess | LoadFailure | Select;
