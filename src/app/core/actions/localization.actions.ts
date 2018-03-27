import { Action } from '@ngrx/store';

export enum LocalizationActionTypes {
    Set = '[Localization] Set',
}

export class Set implements Action {
    readonly type = LocalizationActionTypes.Set;

    constructor(public payload: string) {}
}

export type LocalizationActions = Set;
