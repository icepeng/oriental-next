import { Action } from '@ngrx/store';
import {
    CardEstimate,
    ExpansionEstimate,
} from '../../estimate/models/estimate.model';

export enum SurveyActionTypes {
    SubmitInit = '[Survey] Submit Init',
    SubmitCard = '[Survey] Submit Card',
    SubmitExpansion = '[Survey] Submit Expansion',
}

export class SubmitInit implements Action {
    readonly type = SurveyActionTypes.SubmitInit;
}

export class SubmitCard implements Action {
    readonly type = SurveyActionTypes.SubmitCard;

    constructor(public payload: CardEstimate) {}
}

export class SubmitExpansion implements Action {
    readonly type = SurveyActionTypes.SubmitExpansion;

    constructor(public payload: ExpansionEstimate) {}
}

export type SurveyActions = SubmitCard | SubmitExpansion;
