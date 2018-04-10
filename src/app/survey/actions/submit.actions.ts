import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import {
    SurveyCardForm,
    SurveyExpansionForm,
} from '../models/survey-form.model';

export enum SurveySubmitActionTypes {
    Submit = '[Survey Submit] Submit',
    SubmitSuccess = '[Survey Submit] Submit Success',
    SubmitFailure = '[Survey Submit] Submit Failure',

    SubmitCard = '[Survey Submit] Submit Card',
    SubmitCardSuccess = '[Survey Submit] Submit Card Success',
    SubmitCardFailure = '[Survey Submit] Submit Card Failure',

    SubmitExpansion = '[Survey Submit] Submit Expansion',
    SubmitExpansionSuccess = '[Survey Submit] Submit Expansion Success',
    SubmitExpansionFailure = '[Survey Submit] Submit Expansion Failure',
}

export class Submit implements Action {
    readonly type = SurveySubmitActionTypes.Submit;

    constructor(
        public payload: {
            user: string;
            survey: number;
        },
    ) {}
}

export class SubmitSuccess implements Action {
    readonly type = SurveySubmitActionTypes.SubmitSuccess;

    constructor(
        public payload: {
            id: number;
            user: string;
            survey: number;
        },
    ) {}
}

export class SubmitCard implements Action {
    readonly type = SurveySubmitActionTypes.SubmitCard;

    constructor(
        public payload: {
            survey: number;
            response: number;
            form: SurveyCardForm;
        },
    ) {}
}

export class SubmitCardSuccess implements Action {
    readonly type = SurveySubmitActionTypes.SubmitCardSuccess;

    constructor(
        public payload: {
            survey: number;
            response: number;
            form: SurveyCardForm;
        },
    ) {}
}

export class SubmitExpansion implements Action {
    readonly type = SurveySubmitActionTypes.SubmitExpansion;

    constructor(
        public payload: {
            survey: number;
            response: number;
            form: SurveyExpansionForm;
        },
    ) {}
}

export class SubmitExpansionSuccess implements Action {
    readonly type = SurveySubmitActionTypes.SubmitExpansionSuccess;

    constructor(
        public payload: {
            survey: number;
            response: number;
            form: SurveyExpansionForm;
        },
    ) {}
}

export class SubmitFailure implements Action {
    readonly type = SurveySubmitActionTypes.SubmitFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export class SubmitCardFailure implements Action {
    readonly type = SurveySubmitActionTypes.SubmitCardFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export class SubmitExpansionFailure implements Action {
    readonly type = SurveySubmitActionTypes.SubmitExpansionFailure;

    constructor(public payload: HttpErrorResponse) {}
}

export type SurveySubmitActions =
    | Submit
    | SubmitSuccess
    | SubmitFailure
    | SubmitCard
    | SubmitCardSuccess
    | SubmitCardFailure
    | SubmitExpansion
    | SubmitExpansionSuccess
    | SubmitExpansionFailure;
