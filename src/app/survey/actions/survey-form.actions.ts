import { Action } from '@ngrx/store';
import {
    SurveyCardForm,
    SurveyExpansionForm,
} from '../models/survey-form.model';

export enum SurveyFormActionTypes {
    SelectCard = '[Survey Form] Select Card',
    SubmitCard = '[Survey Form] Submit Card',
    SubmitExpansion = '[Survey Form] Submit Expansion',
}

export class SelectCard implements Action {
    readonly type = SurveyFormActionTypes.SelectCard;

    constructor(public payload: string) {}
}

export class SubmitCard implements Action {
    readonly type = SurveyFormActionTypes.SubmitCard;

    constructor(public payload: SurveyCardForm) {}
}

export class SubmitExpansion implements Action {
    readonly type = SurveyFormActionTypes.SubmitExpansion;

    constructor(public payload: SurveyExpansionForm) {}
}

export type SurveyFormActions = SelectCard | SubmitCard | SubmitExpansion;
