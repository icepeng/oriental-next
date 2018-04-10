import { Action } from '@ngrx/store';

export enum SurveyFormActionTypes {
    Init = '[Survey Form] Init',
    SelectCard = '[Survey Form] Select Card',
}

export class Init implements Action {
    readonly type = SurveyFormActionTypes.Init;
}

export class SelectCard implements Action {
    readonly type = SurveyFormActionTypes.SelectCard;

    constructor(public payload: string) {}
}

export type SurveyFormActions = Init | SelectCard;
