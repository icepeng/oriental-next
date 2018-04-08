import { Action } from '@ngrx/store';

import { CardResponse, ExpansionResponse } from '../models/response.model';
import {
    SurveyCardForm,
    SurveyExpansionForm,
} from '../models/survey-form.model';

export enum SurveyFormActionTypes {
    Init = '[Survey Form] Init',
    Load = '[Survey Form] Load',
    SelectCard = '[Survey Form] Select Card',
    SubmitCard = '[Survey Form] Submit Card',
    SubmitExpansion = '[Survey Form] Submit Expansion',
}

export class Init implements Action {
    readonly type = SurveyFormActionTypes.Init;
}

export class Load implements Action {
    readonly type = SurveyFormActionTypes.Load;

    constructor(
        public payload: {
            cardResponses: CardResponse[];
            expansionResponse: ExpansionResponse;
        },
    ) {}
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

export type SurveyFormActions =
    | Init
    | Load
    | SelectCard
    | SubmitCard
    | SubmitExpansion;
