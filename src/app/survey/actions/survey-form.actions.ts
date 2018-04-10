import { Action } from '@ngrx/store';

export enum SurveyFormActionTypes {
    Init = '[Survey Form] Init',
    SelectCard = '[Survey Form] Select Card',
    CloseError = '[Survey Form] Close Error',
}

export class Init implements Action {
    readonly type = SurveyFormActionTypes.Init;
}

export class SelectCard implements Action {
    readonly type = SurveyFormActionTypes.SelectCard;

    constructor(public payload: string) {}
}

export class CloseError implements Action {
    readonly type = SurveyFormActionTypes.CloseError;
}

export type SurveyFormActions = Init | SelectCard | CloseError;
