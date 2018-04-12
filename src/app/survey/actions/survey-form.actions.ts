import { Action } from '@ngrx/store';
import { SurveyCardFilter } from '../models/filter.model';

export enum SurveyFormActionTypes {
    Init = '[Survey Form] Init',
    SelectCard = '[Survey Form] Select Card',
    CloseError = '[Survey Form] Close Error',
    SetFilter = '[Survey Form] Set Filter',
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

export class SetFilter implements Action {
    readonly type = SurveyFormActionTypes.SetFilter;

    constructor(public payload: SurveyCardFilter) {}
}

export type SurveyFormActions = Init | SelectCard | CloseError | SetFilter;
