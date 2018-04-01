import { Action } from '@ngrx/store';

export enum SurveyActionTypes {
    Submit = '[Survey] Submit',
}

export class Submit implements Action {
    readonly type = SurveyActionTypes.Submit;

    constructor(public payload: string) {}
}

export type SurveyActions = Submit;
