import { Action } from '@ngrx/store';
import { ResponseViewCardFilter } from '../models/filter.model';

export enum ResponseViewActionTypes {
    Init = '[Response View] Init',
    SetFilter = '[Response View] Set Filter',
}

export class Init implements Action {
    readonly type = ResponseViewActionTypes.Init;
}

export class SetFilter implements Action {
    readonly type = ResponseViewActionTypes.SetFilter;

    constructor(public payload: ResponseViewCardFilter) {}
}

export type ResponseViewActions = Init | SetFilter;
